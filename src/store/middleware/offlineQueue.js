import { setError, setSuccess } from 'store/actions';
import { SET_OFFLINE, SET_ONLINE, SET_QUEUE } from 'store/modules/network';

const ASYNC_PAYLOAD_FIELDS = ['queueIfOffline'];

const offlineMiddleware = ({ getState, dispatch }) => (next) => (action) => {
  const {
    network: { isOnline, queue },
  } = getState();

  if (action.type === SET_OFFLINE) {
    next(
      setSuccess(
        "You're now offline. You can continue to make changes, they'll be synchronised once you're back online."
      )
    );
    return next(action);
  }

  if (action.type === SET_ONLINE) {
    const result = next(action);
    next(
      setSuccess(
        "You're back online, any changes you've made will now be synced"
      )
    );
    queue.forEach((queueItem) =>
      typeof queueItem === 'function'
        ? queueItem(dispatch, getState)
        : dispatch(queueItem)
    );
    if (queue.length > 0) next(setSuccess('Your changes have been synced'));
    return result;
  }

  const isFunction = typeof action === 'function';

  const shouldQueue = (action.meta || {}).queueIfOffline || isFunction;

  // check if we don't need to queue the action
  if (isOnline || !shouldQueue) {
    return isFunction ? action(dispatch, getState) : next(action);
  }

  const actionToQueue = isFunction
    ? action
    : {
        type: action.type,
        payload: { ...action.payload },
        meta: {
          ...action.meta,
          skipOptimist: true,
        },
      };

  if (!isFunction && action.meta.skipOptimist) {
    // if it's a action which was in the queue already
    return next({
      type: SET_QUEUE,
      payload: actionToQueue,
    });
  }

  const result = next({
    type: SET_QUEUE,
    payload: actionToQueue,
  });

  if (result)
    next(
      setSuccess(
        "Your change has been queued, we'll try synchronising once you're back online"
      )
    );
  else next(setError("You're change couldn't be queued, please try again"));

  const actionToDispatchNow = action;

  if (!isFunction)
    ASYNC_PAYLOAD_FIELDS.forEach((field) => {
      delete actionToDispatchNow[field];
    });

  return isFunction
    ? Promise.resolve({ data: { message: 'Event was queued' } })
    : next(actionToDispatchNow);
};

export default offlineMiddleware;

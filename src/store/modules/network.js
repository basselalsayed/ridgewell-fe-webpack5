export const SET_QUEUE = 'OFFLINE/SET_QUEUE';
export const SET_ONLINE = 'OFFLINE/SET_ONLINE';
export const SET_OFFLINE = 'OFFLINE/SET_OFFLINE';

const initialState = {
  isOnline: window ? window.navigator.onLine : true,
  queue: [],
};

const networkReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_QUEUE:
      return {
        ...state,
        queue: [...state.queue, payload],
      };
    case SET_ONLINE:
      return {
        ...state,
        isOnline: true,
      };
    case SET_OFFLINE:
      return {
        ...state,
        isOnline: false,
      };

    default:
      return state;
  }
};

export const setOnline = () => ({
  type: SET_ONLINE,
});

export const setOffline = () => ({
  type: SET_OFFLINE,
});

export default networkReducer;

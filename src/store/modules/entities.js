import produce from 'immer';
import { merge, isEqual } from 'lodash';

export const SET_ENTITIES = 'ENTITIES/SET_ENTITIES';
export const UPDATE_NOTIFICATION_ENTITY = 'ENTITIES/UPDATE_NOTIFICATION_ENTITY';

const initialState = {
  holidayRequests: {},
  holidays: {},
  notifications: {},
  users: {},
};
const entitiesReducer = produce((state, { type, payload }) => {
  switch (type) {
    case SET_ENTITIES:
      if (!isEqual(state, payload)) return merge({}, state, payload);
      return state;
    case UPDATE_NOTIFICATION_ENTITY:
      state.notifications[payload.id] = {
        ...state.notifications[payload.id],
        ...payload.data,
      };
    // no default
  }
}, initialState);

export default entitiesReducer;

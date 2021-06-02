import produce from 'immer';
import { merge, isEqual } from 'lodash';

export const SET_ENTITIES = 'ENTITIES/SET_ENTITIES';

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
    // no default
  }
}, initialState);

export default entitiesReducer;

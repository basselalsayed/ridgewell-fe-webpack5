import produce from 'immer';
import { merge } from 'lodash';

export const SET_ENTITIES = 'ENTITIES/SET_ENTITIES';
const entitiesReducer = produce((state, { type, payload }) => {
  switch (type) {
    case SET_ENTITIES:
      return merge({}, state, payload);
    // no default
  }
}, {});

export default entitiesReducer;

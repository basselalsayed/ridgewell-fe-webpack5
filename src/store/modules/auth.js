import axios from 'axios';
import { decryptUser } from 'helpers';

const initialState = {
  get user() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      axios.defaults.headers = { 'x-access-token': user.accessToken };
      return decryptUser(user);
    }
    return null;
  },

  get loggedIn() {
    return !!this.user;
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_USER':
      return {
        ...state,
        user: payload,
      };
    case 'LOG_OUT':
      localStorage.clear();
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

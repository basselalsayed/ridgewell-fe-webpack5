import { decryptUser } from '../../helpers';

const initialState = {
  get user() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? decryptUser(user) : null;
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_USER':
      return {
        user: payload,
      };
    case 'LOG_OUT':
      localStorage.clear();
      return {
        user: null,
      };
    default:
      return state;
  }
};

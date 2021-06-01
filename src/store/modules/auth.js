import axios from 'axios';
import { decryptUser } from 'helpers';
import produce from 'immer';
import { decryptorInstance, usersInstance } from 'services/axios';
import { API_URL } from 'constants';
import { createAction } from 'store';
import { getUserHolidays } from './content';

export const SET_USER = 'AUTH/SET_USER';
export const LOG_OUT = 'AUTH/LOG_OUT';
export const SET_OWN_HOLIDAYS_LOADING = 'AUTH/SET_OWN_HOLIDAYS_LOADING';
export const SET_OWN_HOLIDAYS_LOADED = 'AUTH/SET_OWN_HOLIDAYS_LOADED';

const initialState = {
  get user() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      axios.defaults.headers = { 'x-access-token': user.accessToken };
      return decryptUser(user);
    }
    return null;
  },

  loggedIn: false,
  loadingHolidays: false,
  loadedHolidays: false,
  holidays: [],
};

export default produce((state, { type, payload }) => {
  switch (type) {
    case SET_USER:
      state.loggedIn = true;
      state.user = payload;
      break;
    case LOG_OUT:
      localStorage.clear();
      return {
        ...initialState,
        user: null,
      };
    case SET_OWN_HOLIDAYS_LOADING:
      state.loadingHolidays = true;
      break;
    case SET_OWN_HOLIDAYS_LOADED:
      state.loadingHolidays = false;
      state.loadedHolidays = true;
      state.holidays = payload.result;
      break;
    // no default
  }
}, initialState);

const setUser = (payload) => createAction(SET_USER, payload);

const handleUser = (user) => {
  axios.defaults.headers = { 'x-access-token': user.accessToken };
  decryptorInstance.defaults.headers = { 'x-access-token': user.accessToken };
  usersInstance.defaults.headers = { 'x-access-token': user.accessToken };

  try {
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error("user couldn't be saved to local storage");
  }
};

export const logOut = () => createAction(LOG_OUT);

export const signUp = (userInfo) => (dispatch) =>
  axios.post(`${API_URL}users`, userInfo).then(({ data: { user } }) => {
    if (user && user.accessToken) {
      handleUser(user);
      dispatch(setUser(decryptUser(user)));
    }
  });

export const login = (userInfo) => (dispatch) =>
  axios.post(`${API_URL}session`, userInfo).then(({ data: { user } }) => {
    if (user && user.accessToken) {
      handleUser(user);
      dispatch(setUser(decryptUser(user)));
    }
  });

export const getOwnHolidays = (authUserId) =>
  getUserHolidays(authUserId, [
    SET_OWN_HOLIDAYS_LOADING,
    SET_OWN_HOLIDAYS_LOADED,
  ]);

// export const autoLogin = () => dispatch => {
//   fetch(`http://localhost:4000/auto_login`, {
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//       Authorization: `Bearer ${localStorage.getItem('token')}`,
//     },
//   })
//     .then(res => res.json())
//     .then(data => {
//      // data sent back will in the format of
//      // {
//      //     user: {},
//      //.    token: "aaaaa.bbbbb.bbbbb"
//      // }
//       localStorage.setItem('token', data.token);
//       dispatch(setUser(data.user));
//     });
// };

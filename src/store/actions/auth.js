import axios from 'axios';
import { decryptUser } from 'helpers';
import { decryptorInstance, usersInstance } from 'services/axios';
import { API_URL } from 'constants';

const setUser = (payload) => ({ type: 'SET_USER', payload });

const logOut = () => ({ type: 'LOG_OUT' });

// Methods
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

const signUp = (userInfo) => (dispatch) =>
  axios.post(`${API_URL}users`, userInfo).then(({ data: { user } }) => {
    if (user && user.accessToken) {
      handleUser(user);
      dispatch(setUser(decryptUser(user)));
    }
  });

const login = (userInfo) => (dispatch) =>
  axios.post(`${API_URL}session`, userInfo).then(({ data: { user } }) => {
    if (user && user.accessToken) {
      handleUser(user);
      dispatch(setUser(decryptUser(user)));
    }
  });
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
//       // data sent back will in the format of
//       // {
//       //     user: {},
//       //.    token: "aaaaa.bbbbb.bbbbb"
//       // }
//       localStorage.setItem('token', data.token);
//       dispatch(setUser(data.user));
//     });
// };

export { logOut, signUp, setUser, login };

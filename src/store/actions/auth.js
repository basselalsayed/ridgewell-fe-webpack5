import { API_URL } from '../../constants';
import axios from 'axios';
import { decryptUser } from '../../helpers';

const setUser = payload => ({ type: 'SET_USER', payload });

const logOut = () => ({ type: 'LOG_OUT' });

// Methods

const signUp = userInfo => async dispatch => {
  await axios.post(API_URL + 'users', userInfo).then(({ data: { user } }) => {
    user.accessToken && localStorage.setItem('user', JSON.stringify(user));

    dispatch(setUser(decryptUser(user)));
  });
};

const login = userInfo => async dispatch => {
  await axios.post(API_URL + 'session', userInfo).then(({ data: { user } }) => {
    user.accessToken && localStorage.setItem('user', JSON.stringify(user));

    dispatch(setUser(decryptUser(user)));
  });
};

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

import axios from 'axios';
import { API_URL } from '../constants';
import { decryptUser } from '../helpers';
import authHeader from './auth-header';

const decryptorInstance = axios.create({
  baseURL: API_URL,
  headers: authHeader(),
  timeout: 4000,
});

const decryptManagerId = array =>
  array.length > 0 ? array.map(managerObj => decryptUser(managerObj)) : array;

function decryptNestedHolidays(obj) {
  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (property === 'managerId') {
        obj[property] = decryptManagerId(obj[property]);
      }
      if (property === 'User') {
        obj[property] = decryptUser(obj[property]);
      }
      if (typeof obj[property] === 'object') {
        decryptNestedHolidays(obj[property]);
      }
    }
  }
}

decryptorInstance.interceptors.response.use(res => {
  res.data.forEach(holiday => {
    decryptNestedHolidays(holiday);
  });
  return res;
});

const usersInstance = axios.create({
  baseURL: API_URL + 'users',
  headers: authHeader(),
  timeout: 4000,
});

usersInstance.interceptors.response.use(res => {
  res.data = res.data.map(user => decryptUser(user));
  return res;
});

export { decryptorInstance, usersInstance };

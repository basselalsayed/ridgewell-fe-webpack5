import axios from 'axios';
import { decryptUser } from 'helpers';
import { API_URL } from '../constants';

const decryptorInstance = axios.create({
  baseURL: API_URL,
  timeout: 4000,
});

const decryptManagerId = (array) =>
  array.length > 0 ? array.map((managerObj) => decryptUser(managerObj)) : array;

// function decryptNestedHolidays(obj) {
//   for (const property in obj) {
//     if (obj.hasOwnProperty(property)) {
//       if (property === 'managerId') {
//         obj[property] = decryptManagerId(obj[property]);
//       }
//       if (property === 'User') {
//         obj[property] = decryptUser(obj[property]);
//       }
//       if (typeof obj[property] === 'object') {
//         decryptNestedHolidays(obj[property]);
//       }
//     }
//   }
// }
function decryptNestedHolidays(obj) {
  let object;
  // Object.keys(obj).forEach((key) => {})
  const objectKeys = Object.keys(obj);

  for (let i = 0; i < objectKeys.length; i++) {
    const key = objectKeys[i];
    if (key === 'managerId') {
      object = {
        ...obj,
        managerId: decryptManagerId(obj.managerId),
      };
    }
    if (key === 'User') {
      object = {
        ...object,
        User: decryptManagerId(obj.User),
      };
    }
    if (typeof obj[key] === 'object') {
      decryptNestedHolidays(object[key]);
    }
  }
}

decryptorInstance.interceptors.response.use((res) => {
  res.data.forEach((holiday) => {
    decryptNestedHolidays(holiday);
  });
  return res;
});

const usersInstance = axios.create({
  baseURL: `${API_URL}users`,
  timeout: 4000,
});

usersInstance.interceptors.response.use((res) => {
  res.data = res.data.map((user) => decryptUser(user));
  return res;
});

export { decryptorInstance, usersInstance };

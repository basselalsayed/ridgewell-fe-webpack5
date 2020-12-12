import axios from 'axios';
import authHeader from './auth-header';
import { API_URL } from '../constants';

const ENDPOINT = `${API_URL  }`;

const handleConfirm = () => {
  axios
    .post(ENDPOINT, {}, { headers: authHeader() })
    .then(res => console.log('res', res))
    .catch(err => console.log(err.message));
};
const handleRefuse = () => {
  axios
    .post(ENDPOINT, {}, { headers: authHeader() })
    .then(res => console.log('res', res))
    .catch(err => console.log(err.message));
};

export { handleConfirm, handleRefuse };

import axios from 'axios';
import authHeader from './auth-header';
import { API_URL } from '../constants';

const ENDPOINT = API_URL + 'users/';

const getPublicContent = async () => await axios.get(ENDPOINT);

const getUserBoard = () => {
  return axios.get(ENDPOINT + 'user', { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(ENDPOINT + 'admin', { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getAdminBoard,
};

import axios from 'axios';
import { logMessage } from '../../scripts/utils';

export default async (req, __, next) => {
  axios.defaults.timeout = 50;
  if (!/static/.test(req.url)) {
    try {
      await axios.get(`${process.env.API_URL}ping`);
    } catch (error) {
      logMessage(error.message, 'error');
    }
  }
  next();
};

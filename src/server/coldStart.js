import { logMessage } from '../../scripts/utils';

const axios = require('axios');

export default async (_, __, next) => {
  try {
    await axios.get(`${process.env.API_URL}ping`);
  } catch (error) {
    logMessage(error.message, 'error');
  }
  next();
};

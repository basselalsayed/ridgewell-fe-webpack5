const { logMessage } = require('../../scripts/utils');

const axios = require('axios');

module.exports = async (_, __, next) => {
  try {
    await axios.get(`${process.env.API_URL}ping`);
  } catch (error) {
    logMessage(error.message, 'error');
  }
  next();
};

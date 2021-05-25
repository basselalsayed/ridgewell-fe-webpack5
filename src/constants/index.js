import 'dotenv/config';

const API_URL = process.env.API_URL;

const colors = {
  hasDelete: 'salmon',
  confirmed: 'lightgreen',
  notConfirmed: 'yellow',
  hasUpdate: 'azureblue',
};

const formats = {
  form: 'yyyy-MM-dd',
  popover: 'd/MM/yy',
  panel: 'do LLL y',
  panelTime: 'do LLL y, hh:mm aaaa',
};

const today = new Date();
today.setHours(0, 0, 0, 0);

export { API_URL, colors, formats, today };

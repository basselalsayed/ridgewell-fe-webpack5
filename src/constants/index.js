const API_URL = 'http://localhost:5000/';
// const API_URL = 'https://ridgewell-backend.herokuapp.com/';

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

let today = new Date();
today.setHours(0, 0, 0, 0);

export { API_URL, colors, formats, today };

const setContent = (type, payload) => ({ type, payload });

const setError = error => dispatch => dispatch(setContent('SET_ERROR', error));

const setSuccess = success => dispatch =>
  dispatch(setContent('SET_SUCCESS', success));

const hideAlert = () => dispatch => dispatch(setContent('HIDE_ALERT'));

export { hideAlert, setError, setSuccess };

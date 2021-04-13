import produce from 'immer';

const initialState = {
  error: '',
  show: false,
  success: '',
};

const responseReducer = produce((draft, { type, payload }) => {
  switch (type) {
    case 'SET_ERROR':
      draft.success = '';
      draft.error = payload;
      draft.show = true;
      break;
    case 'SET_SUCCESS':
      draft.success = payload;
      draft.error = '';
      draft.show = true;
      break;
    case 'HIDE_ALERT':
      draft.show = false;
      break;
    // no default
  }
}, initialState);

const setContent = (type, payload) => ({ type, payload });

const setError = (error) => (dispatch) =>
  dispatch(setContent('SET_ERROR', error));

const setSuccess = (success) => (dispatch) =>
  dispatch(setContent('SET_SUCCESS', success));

const hideAlert = () => setContent('HIDE_ALERT');

export { hideAlert, setError, setSuccess };

export default responseReducer;

export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  return user && user.accessToken ? { 'x-access-token': user.accessToken } : {};
}

export const authHeaderFromStore = (store) => {
  const state = store.getState();
  return state.auth.user && state.auth.user.accessToken
    ? {
        'x-access-token': state.auth.user.accessToken,
      }
    : {};
};

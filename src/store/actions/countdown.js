const startConfirmCountdown = id => ({
  type: 'SET_CONFIRM_COUNTDOWN_SHOW',
  id: id,
});
const startDeleteCountdown = id => ({
  type: 'SET_DELETE_COUNTDOWN_SHOW',
  id,
});
const endCountdown = () => ({
  type: 'SET_COUNTDOWN_END',
});

export { endCountdown, startConfirmCountdown, startDeleteCountdown };

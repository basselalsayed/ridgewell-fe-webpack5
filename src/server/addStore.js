import configureStore from '../store';

const addStore = (req, res, next) => {
  const url = req.originalUrl || req.url;

  const { store, history } = configureStore({ url });

  res.locals.store = store;
  res.locals.history = history;
  next();
};

export default addStore;

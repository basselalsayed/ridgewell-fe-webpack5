// import React from 'react';
import { useSelector } from 'react-redux';

const useSession = () => {
  const { user } = useSelector(state => state.authReducer);
  const loggedIn = !!user;
  return { loggedIn, user };
};

export { useSession };

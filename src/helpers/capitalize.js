const capitalize = s => {
  if (typeof s !== 'string') s = s.toString();
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export { capitalize };

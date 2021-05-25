const capitalize = (string) => {
  let s = string;
  if (typeof string !== 'string') s = string.toString();
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export { capitalize };

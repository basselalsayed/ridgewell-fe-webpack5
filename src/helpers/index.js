export * from './capitalize';
export * from './date';
export * from './error';
export * from './decryptor';
export * from './events';
export * from './user';

export const getNestedProperty = (object, path, defaultResult = null) => {
  const reducer = (_object, property) =>
    _object && _object[property] ? _object[property] : null;

  const result = path.reduce(reducer, object);

  return !result && defaultResult ? defaultResult : result;
};

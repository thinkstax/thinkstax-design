export function create(enumObj, defaultKey) {
  Object.defineProperty(enumObj, 'values', {
    value: getValues(enumObj),
    writable: false,
    enumerable: true,
    configurable: false
  });

  const EMPTY_STRING = '';
  if (typeof defaultKey === 'string' && defaultKey.trim() !== EMPTY_STRING) {
    Object.defineProperty(enumObj, 'DEFAULT', {
      value: enumObj[defaultKey],
      writable: false,
      enumerable: true,
      configurable: false
    });
  }

  return Object.freeze(enumObj);
}

export function getValues(enumObj) {
  return Object.keys(enumObj).filter(k => k !== 'values').map(k => enumObj[k]);
}

export default {
  create,
  getValues
};

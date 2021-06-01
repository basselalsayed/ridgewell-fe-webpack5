import { denormalize } from 'normalizr';
import { useCallback } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { holidayRequestSchema } from 'store/schemas/holidayRequestSchema';
import { holidaySchema } from 'store/schemas/holidaySchema';
import { user } from 'store/schemas/userSchema';

const getNestedProperty = (object, path, defaultResult = null) => {
  const result = path.reduce(
    (object, property) =>
      object && object[property] ? object[property] : null,
    object
  );
  return !result && defaultResult ? defaultResult : result;
};

const schemaMap = {
  holidays: [holidaySchema],
  holidayRequests: [holidayRequestSchema],
  users: [user],
};
const useEntities = () => {
  const entities = useSelector((state) => state.entities, shallowEqual);
  const getDenormalizedEntity = useCallback(
    (path, ids) => denormalize(ids, schemaMap[path], entities),
    [entities]
  );

  const getEntity = useCallback(
    (path, ids = Object.keys(entities[path] || {})) =>
      ids.map((id) => getNestedProperty(entities, [path, id])),
    [entities]
  );

  return { entities, getDenormalizedEntity, getEntity };
};

export { useEntities };

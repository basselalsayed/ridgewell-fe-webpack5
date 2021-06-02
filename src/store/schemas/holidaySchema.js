import { schema } from 'normalizr';
import { holidayRequestSchema } from './holidayRequestSchema';
import { user } from './userSchema';

// console.log('holidaySchemaold', holidaySchemaold);

const _holidaySchema = {
  HolidayRequests: [holidayRequestSchema],
  User: user,
};
export const holidaySchema = new schema.Entity('holidays', _holidaySchema);

import { schema } from 'normalizr';

import { userSchema } from './userSchema';

const holidaySchema = new schema.Entity('holidays');
const holidayRequestSchema = new schema.Entity('holidayRequests');

holidaySchema.define({
  User: userSchema,
  HolidayRequests: [holidayRequestSchema],
});

holidayRequestSchema.define({
  User: userSchema,
  managerId: [userSchema],
  Holiday: holidaySchema,
});
// export const holidaysSchema = new schema.Array(holidaySchema);
export { holidaySchema, holidayRequestSchema };

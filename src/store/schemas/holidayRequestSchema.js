import { schema } from 'normalizr';
import { user } from './userSchema';

export const holidayRequestSchema = new schema.Entity('holidayRequests', {
  User: user,
  managerId: [user],
});

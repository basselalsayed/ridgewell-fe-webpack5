import { addMonths, format, addDays } from 'date-fns';
import { formats, today } from '../constants';

const formatted = (date, type) => format(new Date(date), formats[type]);

const plusTwoMonths = date => addMonths(new Date(date), 2);

const plusTwoDays = date => addDays(new Date(date), 2);

const getMin = (annualLeave, update) =>
  !update && annualLeave
    ? formatted(plusTwoMonths(today), 'form')
    : formatted(today, 'form');

const getMax = (annualLeave, date) =>
  !annualLeave && formatted(plusTwoDays(date), 'form');

export { formatted, getMin, getMax, plusTwoMonths, plusTwoDays };

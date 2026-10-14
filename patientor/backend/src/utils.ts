import { type NewPatient } from './types.ts';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (param: unknown, field: string): string => {
  if (!isString(param)) throw new Error('Invalid ' + field);
  return param;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (param: unknown): string => {
  if (!isString(param) || !isDate(param)) throw new Error('Invalid date');

  return param;
};

const parseNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object')
    throw new Error('Incorrect or missing data');

  console.log(object);

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newPatient: NewPatient = {
      name: parseString(object.name, 'name'),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn, 'ssn'),
      gender: parseString(object.gender, 'gender'),
      occupation: parseString(object.occupation, 'occupation'),
    };
    return newPatient;
  }

  throw new Error('Incorrect or missing data');
};

export default parseNewPatient;

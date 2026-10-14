import patients from '../../data/patients.ts';

import { type NonSensitivePatientInfo } from '../types.ts';

const getPatients = () => {
  return patients;
};

const getNonSensitivePatientsInfo = (): NonSensitivePatientInfo[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default { getPatients, getNonSensitivePatientsInfo };

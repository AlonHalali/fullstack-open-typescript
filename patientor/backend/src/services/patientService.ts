import { v1 as uuid } from 'uuid';
import patients from '../../data/patients.ts';

import {
  type NonSensitivePatientInfo,
  type NewPatient,
  type Patient,
} from '../types.ts';

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

const addPatient = (patient: NewPatient) => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, getNonSensitivePatientsInfo, addPatient };

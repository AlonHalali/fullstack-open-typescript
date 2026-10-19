import { v1 as uuid } from 'uuid';
import patients from '../../data/patients.ts';

import {
  type NonSensitivePatientInfo,
  type NewPatient,
  type Patient,
  type NewEntry,
  type Entry,
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

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  if (!patient) return undefined;

  return {
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    ssn: patient.ssn,
    gender: patient.gender,
    occupation: patient.occupation,
    entries: patient.entries,
  };
};

const addPatient = (patient: NewPatient) => {
  const newPatient: Patient = {
    id: uuid(),
    entries: [],
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, newEntry: NewEntry): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  if (!patient) return undefined;

  const entry: Entry = {
    ...newEntry,
    id: uuid(),
  };

  patient.entries.push(entry);
  return patient;
};

export default {
  getPatients,
  getNonSensitivePatientsInfo,
  getPatient,
  addPatient,
  addEntry,
};

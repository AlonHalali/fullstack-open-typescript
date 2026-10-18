import { z } from 'zod';

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other',
} as const;
export type Gender = (typeof Gender)[keyof typeof Gender];

export const NewPatientSchema = z.object({
  name: z.string(),
  ssn: z.string(),
  occupation: z.string(),
  gender: z.enum(Gender),
  dateOfBirth: z.iso.date(),
});

export type NewPatient = z.infer<typeof NewPatientSchema>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}
export interface Patient extends NewPatient {
  id: string;
  entries: Entry[];
}

export type NonSensitivePatientInfo = Omit<Patient, 'ssn' | 'entries'>;

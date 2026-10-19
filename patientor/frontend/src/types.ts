// ─── Constants ────────────────────────────────────────────
export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other',
} as const;
export type Gender = (typeof Gender)[keyof typeof Gender];

export const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;
export type HealthCheckRating =
  (typeof HealthCheckRating)[keyof typeof HealthCheckRating];

export const healthCheckRatingOptions = [
  { value: 0, label: 'Healthy' },
  { value: 1, label: 'Low Risk' },
  { value: 2, label: 'High Risk' },
  { value: 3, label: 'Critical Risk' },
];
// ─── Types ────────────────────────────────────────────────
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<string>;
  description: string;
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}
export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: { startDate: string; endDate: string };
}
export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge?: { date: string; criteria: string };
}

export type Entry =
  | HealthCheckEntry
  | OccupationalHealthcareEntry
  | HospitalEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

// ─── Type Helpers ─────────────────────────────────────────
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

// ─── Input Types ──────────────────────────────────────────
export type NewEntry = UnionOmit<Entry, 'id'>;

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;

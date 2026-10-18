// ─── Imports ──────────────────────────────────────────────
import { z } from 'zod';

// ─── Constants ────────────────────────────────────────────
const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other',
} as const;
export type Gender = (typeof Gender)[keyof typeof Gender];

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;
export type HealthCheckRating =
  (typeof HealthCheckRating)[keyof typeof HealthCheckRating];

// ─── Schemas ──────────────────────────────────────────────
// Diagnose
export const DiagnoseSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});

// Entry
export const BaseEntrySchema = z.object({
  id: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  description: z.string(),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.enum(HealthCheckRating),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.iso.date(),
      endDate: z.iso.date(),
    })
    .optional(),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z
    .object({
      date: z.iso.date(),
      criteria: z.string(),
    })
    .optional(),
});

const EntrySchema = z.discriminatedUnion('type', [
  HealthCheckEntrySchema,
  OccupationalHealthcareEntrySchema,
  HospitalEntrySchema,
]);

export const NewEntrySchema = z.discriminatedUnion('type', [
  HealthCheckEntrySchema.omit({ id: true }),
  OccupationalHealthcareEntrySchema.omit({ id: true }),
  HospitalEntrySchema.omit({ id: true }),
]);

// Patient
export const PatientSchema = z.object({
  id: z.string(),
  name: z.string(),
  ssn: z.string(),
  occupation: z.string(),
  gender: z.enum(Gender),
  dateOfBirth: z.iso.date(),
  entries: z.array(EntrySchema),
});

export const NewPatientSchema = PatientSchema.omit({
  id: true,
  entries: true,
});

// ─── Inferred Types ───────────────────────────────────────
export type Diagnose = z.infer<typeof DiagnoseSchema>;

export type Entry = z.infer<typeof EntrySchema>;
export type NewEntry = z.infer<typeof NewEntrySchema>;

export type Patient = z.infer<typeof PatientSchema>;
export type NewPatient = z.infer<typeof NewPatientSchema>;
export type NonSensitivePatientInfo = Omit<Patient, 'ssn' | 'entries'>;

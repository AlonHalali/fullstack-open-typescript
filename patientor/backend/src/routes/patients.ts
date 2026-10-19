import express, {
  type Response,
  type Request,
  type NextFunction,
} from 'express';

import patientService from '../services/patientService.ts';
import type {
  NonSensitivePatientInfo,
  NewPatient,
  Patient,
  NewEntry,
} from '../types.ts';
import {
  newPatientParser,
  patientParser,
  errorMiddleware,
} from '../middleware.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientInfo[]>) => {
  res.send(patientService.getNonSensitivePatientsInfo());
});

router.post(
  '/',
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatient>,
    res: Response<Patient>,
    next: NextFunction,
  ) => {
    try {
      const addedPatient = patientService.addPatient(req.body);
      res.send(addedPatient);
    } catch (error: unknown) {
      next(error);
    }
  },
);

router.get(
  '/:id',
  (
    req: Request<{ id: string }>,
    res: Response<Patient | { error: string }>,
  ) => {
    const patient = patientService.getPatient(req.params.id);
    if (!patient)
      res.status(404).json({ error: 'Patient with this id not found!' });
    else res.json(patient);
  },
);

router.post(
  '/:id/entries',
  patientParser,
  (
    req: Request<{ id: string }, unknown, NewEntry>,
    res: Response<Patient | { error: string }>,
    next: NextFunction,
  ) => {
    const id = req.params.id;
    try {
      const updatedPatient = patientService.addEntry(id, req.body);
      res.send(updatedPatient);
    } catch (error) {
      next(error);
    }
  },
);

router.use(errorMiddleware);

export default router;

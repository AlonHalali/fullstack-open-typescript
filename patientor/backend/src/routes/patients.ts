import express, {
  type Response,
  type Request,
  type NextFunction,
} from 'express';

import patientService from '../services/patientService.ts';
import type { NonSensitivePatientInfo, NewPatient, Patient } from '../types.ts';
import { newPatientParser, errorMiddleware } from '../middleware.ts';

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

router.use(errorMiddleware);

export default router;

import express, { type Response } from 'express';

import patientService from '../services/patientService.ts';
import parseNewPatient from '../utils.ts';
import { type NonSensitivePatientInfo } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientInfo[]>) => {
  res.send(patientService.getNonSensitivePatientsInfo());
});

router.post('/', (req, res) => {
  try {
    const newPatient = parseNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.send(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) errorMessage += ' Error: ' + error.message;
    res.status(400).json({ error: errorMessage });
  }
});

export default router;

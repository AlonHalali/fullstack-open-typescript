import express, { type Response } from 'express';

import patientService from '../services/patientService.ts';

import { type NonSensitivePatientInfo } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientInfo[]>) => {
  res.send(patientService.getNonSensitivePatientsInfo());
});
export default router;

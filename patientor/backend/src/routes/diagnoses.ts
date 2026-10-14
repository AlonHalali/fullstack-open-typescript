import express, { type Response } from 'express';

import diagnoseService from '../services/diagnoseService.ts';

import { type Diagnose } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnose[]>) => {
  res.send(diagnoseService.getDiagnoses());
});

export default router;

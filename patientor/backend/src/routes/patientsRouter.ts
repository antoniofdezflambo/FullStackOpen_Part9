import express, { type Response } from 'express';
import patientsService from '../services/patientsService.ts';
import type { NonSensitivePatient } from '../../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  const data = patientsService.getNonSensitiveEntries();
  res.send(data);
});

router.post('/', (_req, res) => {
  res.send("add a new patient");
});

export default router;
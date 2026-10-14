/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express, { type Response } from 'express';
import patientsService from '../services/patientsService.ts';
import type { NonSensitivePatient } from '../../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  const data = patientsService.getNonSensitiveEntries();
  res.send(data);
});

router.get('/:id', (req, res) => {
  const patient = patientsService.findById(req.params.id);

  if(patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;

  const addedPatient = patientsService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  });

  res.json(addedPatient);
});

export default router;
import express, { type Response } from 'express';
import patientsService from '../services/patientsService.ts';
import type { NonSensitivePatient } from '../../types.ts';
import parseNewPatient from '../../utils.ts';

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
  try {
    const newPatient = parseNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    
    if (error instanceof Error) {
      errorMessage += ' Error: ' + errorMessage;
    }

    res.status(400).send(errorMessage);
  }
});

export default router;
import express, { type NextFunction, type Response, type Request } from 'express';
import { z } from 'zod';

import patientsService from '../services/patientsService.ts';

import { type NonSensitivePatient, type NewPatient, type Patient } from '../../types.ts';
import { newPatientParser } from '../../middleware.ts';

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

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedPatient = patientsService.addPatient(req.body);
  res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;
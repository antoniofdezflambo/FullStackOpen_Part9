import express from 'express';
import patientsService from '../services/patientsService.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = patientsService.getEntries();
  res.send(data);
});

router.post('/', (_req, res) => {
  res.send("add a new patient");
});

export default router;
import patients from '../../data/patients.ts';
import type { Patient, NonSensitivePatient, NewPatient } from '../../types.ts';

import { v1 as uuid } from 'uuid';

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( patient: NewPatient ): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

const findById = (id:string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById
};
import diagnosesData from '../../data/diagnoses.ts';
import type { Diagnosis } from '../../types.ts';

const getEntries = (): Diagnosis[] => {
  return diagnosesData;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getEntries,
  addDiagnosis
};
import { getItem, saveItem } from './asyncStorage';

const PATIENT_KEY = 'patients';

export const getPatients = async () => {
  return (await getItem(PATIENT_KEY)) || [];
};

export const addPatient = async (patient) => {
  const patients = await getPatients();
  const newList = [...patients, patient];
  await saveItem(PATIENT_KEY, newList);
  return newList;
};

export const updatePatient = async (id, updated) => {
  const patients = await getPatients();
  const newList = patients.map((p) => (p.id === id ? { ...p, ...updated } : p));
  await saveItem(PATIENT_KEY, newList);
  return newList;
};

export const deletePatient = async (id) => {
  const patients = await getPatients();
  const newList = patients.filter((p) => p.id !== id);
  await saveItem(PATIENT_KEY, newList);
  return newList;
};

export const getPatientById = async (id) => {
  const patients = await getPatients();
  const found = patients.find(p => p.id === id);
  if (found) return found;

  // Fallback: some seed data stores patients inside 'users' key (role === 'patient').
  // If no patient record exists under 'patients', try reading 'users'.
  try {
    const users = (await getItem('users')) || [];
    const user = users.find(u => u.id === id && (u.role === 'patient' || u.role === 'patient'));
    if (user) return user;
  } catch (err) {
    // ignore and return null below
  }

  return null;
};
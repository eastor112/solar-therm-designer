import { storageKeys } from '../types/general';

export const clearProjectStorage = () => {
  localStorage.removeItem(storageKeys.location);
  localStorage.removeItem(storageKeys.pipeType);
  localStorage.removeItem(storageKeys.date);
  localStorage.removeItem(storageKeys.manifoldLength);
  localStorage.removeItem(storageKeys.pipeNumber);
  localStorage.removeItem(storageKeys.volumen);
  localStorage.removeItem(storageKeys.currentProject);
}

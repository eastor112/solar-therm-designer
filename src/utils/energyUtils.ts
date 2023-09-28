import { IRegister } from "../types/registersTypes";

export const findMinMaxEnergy = (data: IRegister[]) => {
  if (data.length === 0) {
    return { min: null, max: null };
  }

  const minEnergy = data.reduce((min, current) => {
    return current.energy < min ? current.energy : min;
  }, data[0].energy);

  const maxEnergy = data.reduce((max, current) => {
    return current.energy > max ? current.energy : max;
  }, data[0].energy);

  return { min: minEnergy, max: maxEnergy };
};

export const calculateAnnualEnergyTotal = (data: IRegister[]) => {
  if (data.length === 0) {
    return 0;
  }

  const totalEnergy = data.reduce((sum, current) => {
    return sum + current.energy;
  }, 0);

  return totalEnergy;
};

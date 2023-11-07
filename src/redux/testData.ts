import { IRegister } from "../types/registersTypes"



const generateData = (): IRegister[] => {
  const data: IRegister[] = [];

  for (let i = 1; i <= 365; i++) {
    const id = Math.floor(Math.random() * 10000000);
    const energy = Math.random();
    const params_id = 13;

    data.push({
      id,
      day: i,
      energy,
      params_id,
    });
  }

  return data;
};

export const currentRegister: IRegister[] = generateData()

export const registers: IRegister[][] = [
  generateData(),
  generateData(),
  generateData(),
]

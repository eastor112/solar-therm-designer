import { IRegister } from "../types/registersTypes"

const generateData = (): IRegister[] => {
  const data: IRegister[] = [];
  const params_id = Math.floor(Math.random() * 20);

  for (let i = 1; i <= 365; i++) {
    const id = Math.floor(Math.random() * 10000000);
    const energy = Math.random();

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
  generateData(),
  generateData(),
]

export const transformData = (inputData: any) => {
  let transformedData: any[] = []

  for (let i = 1; i <= 365; i++) {
    transformedData.push({
      day: i,
    })
  }

  inputData.forEach((reg: any[]) => {
    transformedData = transformedData.map((td: any) => {
      const element: IRegister = reg.find(r => r.day === td.day)
      return {
        ...td,
        [`e${element.params_id}`]: element.energy
      }
    });
  });

  return transformedData;
};


export const extractEnergyKeys = (inputData: IRegister[][]): string[] => {
  const keys: string[] = []

  inputData.forEach((reg: IRegister[]) => {
    keys.push(`e${reg[0].params_id}`)
  })

  return keys
}

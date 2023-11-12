import { ExtendedParams, IParams } from "../types/paramsTypes";
import { IRegister } from '../types/registersTypes';
import { calculateAnnualEnergyTotal } from "../utils/energyUtils";

const generateData = (params_id: number): IRegister[] => {
  const data: IRegister[] = [];

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

export const currentRegister: IRegister[] = generateData(12)

export const registers: IRegister[][] = [
  generateData(13),
  generateData(14),
  generateData(15),
  generateData(16),
  generateData(17),
]

export const transformRegisters = (inputData: any) => {
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

export const extendedAllParams = (allParams: IParams[], registers: IRegister[][]): ExtendedParams[] => {
  return allParams.map(param => {
    const r = registers.find(reg => reg[0].params_id === param.id);
    return { ...param, annualEnergy: calculateAnnualEnergyTotal(r!) };
  });
};

export interface ParamsToExport {
  id: number,
  inclination_deg: number,
  azimuth_deg: number,
  granularity: number,
  pipeline_separation: number,
  external_diameter: number,
  internal_diameter: number,
  length: number,
  annualEnergy: number
}

export const transformParams = (params: ExtendedParams[]): ParamsToExport[] => {
  return params.map(param => ({
    id: param.id,
    inclination_deg: param.inclination_deg,
    azimuth_deg: param.azimuth_deg,
    granularity: param.granularity,
    pipeline_separation: param.pipeline_separation,
    external_diameter: param.pipeline.external_diameter,
    internal_diameter: param.pipeline.internal_diameter,
    length: param.pipeline.length,
    annualEnergy: param.annualEnergy
  }
  ));
}

export const extractEnergyKeys = (inputData: IRegister[][]): string[] => {
  const keys: string[] = []

  if (inputData.length === 0) return keys

  inputData.forEach((reg: IRegister[]) => {
    keys.push(`e${reg[0].params_id}`)
  })

  return keys
}

export const testParams: IParams[] = [
  {
    id: 13,
    inclination_deg: 30,
    azimuth_deg: 150,
    granularity: 12,
    pipeline_separation: 0.2,
    location: {
      id: 2,
      place: 'Trujillo',
      country: 'Peru',
      lat: -8.12,
      lng: -79.03,
      altitude: 34,
      is_calculated: false,
      created_at: "",
      updated_at: ""
    },
    pipeline: {
      id: 33,
      name: 'Pipeline-579',
      external_diameter: 0.05836,
      internal_diameter: 0.04302,
      length: 1.6
    }
  },
  {
    id: 14,
    inclination_deg: 45,
    azimuth_deg: 160,
    granularity: 24,
    pipeline_separation: 0.2,
    location: {
      id: 2,
      place: 'Trujillo',
      country: 'Peru',
      lat: -8.12,
      lng: -79.03,
      altitude: 34,
      is_calculated: false,
      created_at: "",
      updated_at: ""
    },
    pipeline: {
      id: 33,
      name: 'Pipeline-579',
      external_diameter: 0.05836,
      internal_diameter: 0.04302,
      length: 1.7
    }
  },
  {
    id: 15,
    inclination_deg: 60,
    azimuth_deg: 170,
    granularity: 48,
    pipeline_separation: 0.2,
    location: {
      id: 2,
      place: 'Trujillo',
      country: 'Peru',
      lat: -8.12,
      lng: -79.03,
      altitude: 34,
      is_calculated: false,
      created_at: "",
      updated_at: ""
    },
    pipeline: {
      id: 33,
      name: 'Pipeline-579',
      external_diameter: 0.05836,
      internal_diameter: 0.04302,
      length: 1.8
    }
  },
  {
    id: 16,
    inclination_deg: 60,
    azimuth_deg: 170,
    granularity: 48,
    pipeline_separation: 0.2,
    location: {
      id: 2,
      place: 'Trujillo',
      country: 'Peru',
      lat: -8.12,
      lng: -79.03,
      altitude: 34,
      is_calculated: false,
      created_at: "",
      updated_at: ""
    },
    pipeline: {
      id: 33,
      name: 'Pipeline-579',
      external_diameter: 0.05836,
      internal_diameter: 0.04302,
      length: 1.8
    }
  },
  {
    id: 17,
    inclination_deg: 60,
    azimuth_deg: 170,
    granularity: 48,
    pipeline_separation: 0.2,
    location: {
      id: 2,
      place: 'Trujillo',
      country: 'Peru',
      lat: -8.12,
      lng: -79.03,
      altitude: 34,
      is_calculated: false,
      created_at: "",
      updated_at: ""
    },
    pipeline: {
      id: 33,
      name: 'Pipeline-579',
      external_diameter: 0.05836,
      internal_diameter: 0.04302,
      length: 1.8
    }
  }
]

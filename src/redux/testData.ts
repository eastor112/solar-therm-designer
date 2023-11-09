import { IParams } from "../types/paramsTypes";
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

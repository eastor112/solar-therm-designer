export interface IRegister {
  id: number;
  day: number;
  energy: number;
  params_id: number;
}

export interface ICalculationResponse {
  message: string;
}


export interface ProcessedData {
  id: number;
  inclination_deg: number;
  azimuth_deg: number;
  granularity: number;
  pipeline_separation: number;
  external_diameter: number;
  internal_diameter: number;
  length: number;
  annualEnergy: number;
}

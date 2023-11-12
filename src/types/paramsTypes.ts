import { ILocation } from "./locationstypes";
import { IPipeline } from "./pipelinesTypes";

export interface IParamsBody {
  inclination_deg: number;
  azimuth_deg: number;
  granularity: number;
  pipeline_separation: number;
  location_id: number;
  pipeline_id: number;
}

export interface IParams {
  id: number;
  inclination_deg: number;
  azimuth_deg: number;
  granularity: number;
  pipeline_separation: number;
  location: ILocation;
  pipeline: IPipeline;
}

export interface ExtendedParams extends IParams {
  annualEnergy: number;
}

export type RawType = "weather" | "energy" | "comparison"

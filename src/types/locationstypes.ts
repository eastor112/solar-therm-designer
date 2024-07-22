import { INewProject } from "./projects";

export interface ILocation {
  id: number;
  place: string;
  country: string;
  lat: number;
  lng: number;
  altitude: number;
  is_calculated: boolean;
  created_at: string;
  updated_at: string;
}

export interface IProject {
  id: number;
  name: string;
  user_id: number;
  pipeline_number: null;
  pipeline_type: null;
  volumen: null;
  manifold: null;
  date: string;
  location: ILocation | null;
  user: User;
  updated_at: string;
  created_at: string;
}


export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_admin: boolean;
}

export interface IProjectData {
  page: number;
  total: number;
  projects: INewProject[];
  page_size: number;
}

export interface IPayloadUpdateProject {
  name?: string
  pipeline_number?: number,
  pipeline_type?: number,
  volumen?: number,
  manifold?: number,
  date?: string,
  location_id?: number
}

export interface IWeather {
  id: number;
  dhi: number;
  temperature: number;
  clearsky_dhi: number;
  clearsky_dni: number;
  clearsky_ghi: number;
  dni: number;
  ghi: number;
  cloud_type: number;
  relative_humidity: number;
  solar_zenith_angle: number;
  wind_direction: number;
  wind_speed: number;
  location_id: number;
  date: string;
}


export interface PVGISData {
  inputs: PVGISDataInputs;
  outputs: PVGISDataOutputs;
  meta: Meta;
}

export interface PVGISDataInputs {
  location: PurpleLocation;
  meteo_data: PurpleMeteoData;
  mounting_system: PurpleMountingSystem;
  pv_module: VariablesClass;
}

export interface PurpleLocation {
  latitude: number;
  longitude: number;
  elevation: number;
}

export interface PurpleMeteoData {
  radiation_db: string;
  meteo_db: string;
  year_min: number;
  year_max: number;
  use_horizon: boolean;
  horizon_db: null;
  horizon_data: string;
}

export interface PurpleMountingSystem {
  fixed: Fixed;
}

export interface Fixed {
  slope: Azimuth;
  azimuth: Azimuth;
  type: string;
}

export interface Azimuth {
  value: number;
  optimal: boolean;
}

export interface VariablesClass {
  technology: Technology | null;
  peak_power: PeakPower | null;
  system_loss: PeakPower | null;
}

export interface PeakPower {
  description: string;
  units: string;
}

export interface Technology {
  description: string;
}

export interface Meta {
  inputs: MetaInputs;
  outputs: MetaOutputs;
}

export interface MetaInputs {
  location: FluffyLocation;
  meteo_data: FluffyMeteoData;
  mounting_system: FluffyMountingSystem;
  pv_module: PurplePVModule;
}

export interface FluffyLocation {
  description: string;
  variables: LocationVariables;
}

export interface LocationVariables {
  latitude: PeakPower;
  longitude: PeakPower;
  elevation: PeakPower;
}

export interface FluffyMeteoData {
  description: string;
  variables: MeteoDataVariables;
}

export interface MeteoDataVariables {
  radiation_db: Technology;
  meteo_db: Technology;
  year_min: Technology;
  year_max: Technology;
  use_horizon: Technology;
  horizon_db: Technology;
}

export interface FluffyMountingSystem {
  description: string;
  choices: string;
  fields: Fields;
}

export interface Fields {
  slope: PeakPower;
  azimuth: PeakPower;
}

export interface PurplePVModule {
  description: string;
  variables: VariablesClass;
}

export interface MetaOutputs {
  hourly: PurpleHourly;
}

export interface PurpleHourly {
  type: string;
  timestamp: string;
  variables: HourlyVariables;
}

export interface HourlyVariables {
  "G(i)": PeakPower;
  H_sun: PeakPower;
  T2m: PeakPower;
  WS10m: PeakPower;
  Int: Technology;
}

export interface PVGISDataOutputs {
  hourly: HourlyElement[];
}

export interface HourlyElement {
  time: string;
  "G(i)": number;
  H_sun: number;
  T2m: number;
  WS10m: number;
  Int: number;
}

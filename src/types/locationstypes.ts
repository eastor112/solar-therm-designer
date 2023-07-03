export interface ILocation {
  id: number;
  place: string;
  country: string;
  lat: number;
  lng: number;
  is_calculated: boolean;
  created_at: string;
  updated_at: string;
}

export interface IProject {
  id: number;
  name: string;
  user_id: number;
  pipeline_number: number;
  pipeline_type: null;
  volumen: null;
  manifold: null;
  date: null;
  location: ILocation | null;
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

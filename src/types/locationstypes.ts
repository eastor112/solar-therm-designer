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
  deleted: boolean;
  location_id: ILocation | null;
}

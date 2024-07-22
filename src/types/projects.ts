import { UserData } from "./usersTypes";

export interface INewProject {
  name_project: string;
  place: number;
  latitud: number;
  longitud: number;
  t_amb: number;
  v_viento: number;
  altitud: number;
  date_time: string;
  inclinacion: number;
  azimuth: number;
  vol_tank: number;
  e_tank: number;
  e_aisl: number;
  e_cub: number;
  h_int: number;
  h_ext: number;
  k_tank: number;
  k_aisl: number;
  k_cub: number;
  d_int: number;
  d_ext: number;
  longitud_tubo: number;
  s_sep: number;
  num_tubos: number;
  tau_glass: number;
  alfa_glass: number;
  n_div: number;
  nn: number;
  beta_coef: number;
  f_flujo: number;
  user_id: number;
  id: number;
  created_at: string;
  updated_at: string;
  user: UserData;
}

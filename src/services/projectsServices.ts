import envVars from '../configs';
import { IPayloadUpdateProject, IProject, IProjectData } from '../types/locationstypes';

export const getAllProjectsService = async (limit: number, page: number, filter?: string) => {
  let url = `${envVars.API_HOST}/projects?size=${limit}&page=${page}`
  url = filter ? `${url}&filter=${filter}` : url;

  const response = await fetch(url);

  return response.json() as Promise<IProjectData>;
};

export const getProjectService = async (id: number) => {
  const response = await fetch(`${envVars.API_HOST}/projects/${id}`);

  return response.json() as Promise<IProject>;
};

export const createProjectService = async (name: string) => {
  const response = await fetch(`${envVars.API_HOST}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      name,
      user_id: 1,
    }),
  });

  return response.json() as Promise<IProject>;
};

export const updateProjectService = async (
  project_id: number,
  payload: IPayloadUpdateProject
) => {
  const response = await fetch(`${envVars.API_HOST}/projects/${project_id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(payload),
  });

  return response.json() as Promise<IProject>;
};


export interface ICalculateParamsBody {
  // PARAMS
  name_project: string
  place: number
  latitud: number
  longitud: number
  t_amb: number
  v_viento: number
  altitud: number
  date_time: string | null

  // ANGLE PARAMS
  inclinacion: number
  azimuth: number

  // TANK PARAMS
  vol_tank: number
  e_tank: number
  e_aisl: number
  e_cub: number
  // MODAL TANK PARAMS
  h_int: number
  h_ext: number
  k_tank: number
  k_aisl: number
  k_cub: number

  // PIPELINE PARAMS
  d_int: number,
  d_ext: number,
  longitud_tubo: number,
  s_sep: number,
  num_tubos: number,
  // MODAL PIPELINE PARAMS
  tau_glass: number,
  alfa_glass: number,

  // MODAL OTHER GENERAL PARAMS
  n_div: number,
  nn: number,
  beta_coef: number,
  f_flujo: number,
}


export const getProjectResults = async (body: ICalculateParamsBody) => {
  const response = await fetch(`${envVars.API_HOST}/weather/calculate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(body),
  });

  return await response.json();
}

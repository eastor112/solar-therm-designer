import envVars from '../configs';
import { IProjectData } from '../types/locationstypes';
import { INewProject } from '../types/projects';

const baseURL = `${envVars.API_HOST}/projects/v2`

export const getAllProjectsService = async (limit: number, page: number, filter?: string) => {
  let url = baseURL + `?size=${limit}&page=${page}`
  url = filter ? `${url}&filter=${filter}` : url;

  const response = await fetch(url);

  return response.json() as Promise<IProjectData>;
};

export const getProjectService = async (id: number) => {
  const response = await fetch(baseURL + `/${id}`);

  return response.json() as Promise<INewProject>;
};

export const createProjectService = async (body: any) => {
  const response = await fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      ...body,
      user_id: 1,
    }),
  });

  return response.json() as Promise<INewProject>;
};

export const updateProjectService = async (
  project_id: number,
  payload: any
) => {
  const response = await fetch(baseURL + `/${project_id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(payload),
  });

  return response.json() as Promise<INewProject>;
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

export interface ISolarData {
  azimuth_solar: number[];
  eficiencia_1: number[];
  eficiencia_dia: number[];
  eficiencia_dia_mendoza: number[];
  energia_acumulada: number[];
  energia_acumulado_dia: number[];
  energia_acumulado_dia_mendoza: number[];
  energia_n_tubo: number[];
  energia_tubo: number[];
  evolucion_nu_gr_pr: number[];
  evolucion_reynolds: number[];
  flujo_masico: number[];
  hora_m: number[];
  hora_std: number[];
  inclinacion_solar: number[];
  irradiacion_extraterrestre: number[];
  potencia_difusa: number[];
  potencia_haz: number[];
  potencia_total: number[];
  potencia_tubo: number;
  radiacion_extraterrestre: number[];
  temperatura_ambiente: number[];
  temperatura_mezcla: number[];
  temperatura_salida: number[];
  temperatura_tanque: number[];
  velocidad_salida: number[];
}

export enum SolarDataKeys {
  AzimuthSolar = "azimuth_solar",
  Eficiencia1 = "eficiencia_1",
  EficienciaDia = "eficiencia_dia",
  EficienciaDiaMendoza = "eficiencia_dia_mendoza",
  EnergiaAcumulada = "energia_acumulada",
  EnergiaAcumuladoDia = "energia_acumulado_dia",
  EnergiaAcumuladoDiaMendoza = "energia_acumulado_dia_mendoza",
  EnergiaNTubo = "energia_n_tubo",
  EnergiaTubo = "energia_tubo",
  EvolucionNuGrPr = "evolucion_nu_gr_pr",
  EvolucionReynolds = "evolucion_reynolds",
  FlujoMasico = "flujo_masico",
  HoraM = "hora_m",
  HoraStd = "hora_std",
  InclinacionSolar = "inclinacion_solar",
  IrradiacionExtraterrestre = "irradiacion_extraterrestre",
  PotenciaDifusa = "potencia_difusa",
  PotenciaHaz = "potencia_haz",
  PotenciaTotal = "potencia_total",
  PotenciaTubo = "potencia_tubo",
  RadiacionExtraterrestre = "radiacion_extraterrestre",
  TemperaturaAmbiente = "temperatura_ambiente",
  TemperaturaMezcla = "temperatura_mezcla",
  TemperaturaSalida = "temperatura_salida",
  TemperaturaTanque = "temperatura_tanque",
  VelocidadSalida = "velocidad_salida"
}

export const getProjectResults = async (body: ICalculateParamsBody): Promise<ISolarData | null> => {
  const response = await fetch(`${envVars.API_HOST}/weather/calculate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    return await response.json();
  } else {
    return null
  }
}

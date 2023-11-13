import envVars from '../configs';
import { IParams, IParamsBody } from '../types/paramsTypes';
import { ICalculationResponse } from '../types/registersTypes';

export const getAllParamsService = async () => {
  const response = await fetch(`${envVars.API_HOST}/theoretical`);
  return response.json() as Promise<IParams[]>;
};

export const getParamService = async (id: number) => {
  const response = await fetch(`${envVars.API_HOST}/theoretical/${id}`);
  return response.json() as Promise<IParams>;
};

export const createParamsService = async (body: IParamsBody) => {
  const response = await fetch(`${envVars.API_HOST}/theoretical`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(body),
  });

  return response.json() as Promise<IParams>;
};

export const calculateParamService = async (paramID: number | string) => {
  const response = await fetch(`${envVars.API_HOST}/theoretical/calculate/params/${paramID}`);

  return response.json() as Promise<ICalculationResponse>;
};

export const getAllParamsProject = async (project_id: number) => {
  const response = await fetch(`${envVars.API_HOST}/theoretical/project/${project_id}`);

  return response.json() as Promise<IParams[]>;
}

export const deleteParamsService = async (param_id: number) => {
  const response = await fetch(`${envVars.API_HOST}/theoretical/${param_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  return response.json();
}

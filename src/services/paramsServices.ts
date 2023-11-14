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

export const getAllParamsProject = async (projectID: number) => {
  const response = await fetch(`${envVars.API_HOST}/theoretical/project/${projectID}`);

  return response.json() as Promise<IParams[]>;
}

export const deleteParamsService = async (paramID: number) => {
  const response = await fetch(`${envVars.API_HOST}/theoretical/${paramID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  return response.json();
}

export const deleteAllParamsSelectedService = async (paramsIDs: number[]) => {
  const response = await fetch(`${envVars.API_HOST}/theoretical/delete/multiple`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ params_ids: paramsIDs }),
  });

  return response.json();
}

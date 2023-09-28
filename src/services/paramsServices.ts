import envVars from '../configs';
import { IParams, IParamsBody } from '../types/paramsTypes';

export const getAllParamsService = async () => {
  const response = await fetch(`${envVars.API_HOST}/theoretical`);
  return response.json() as Promise<IParams[]>;
};

export const getParamsService = async (id: number) => {
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

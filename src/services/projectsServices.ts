import envVars from '../configs';
import { IPayloadUpdateProject, IProject, IProjectData } from '../types/locationstypes';

export const getAllProjectsService = async (limit: number, page: number) => {
  const response = await fetch(
    `${envVars.API_HOST}/projects?size=${limit}&page=${page}`
  );

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

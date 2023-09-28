import envVars from '../configs';
import { IPipeline, IPipelineBody } from '../types/pipelinesTypes';


export const createPipelineService = async (
  body: IPipelineBody
) => {
  const bodyCopy = { ...body }

  if (!body.name) {
    bodyCopy.name = `Pipeline-${Math.floor(Math.random() * 1000)}`;
  }

  const response = await fetch(`${envVars.API_HOST}/pipelines`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(bodyCopy),
  });

  return response.json() as Promise<IPipeline>;
};

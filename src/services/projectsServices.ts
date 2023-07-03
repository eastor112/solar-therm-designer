import envVars from "../configs";
import { IProject } from "../types/locationstypes";

export const createProjectService = async (name: string) => {
  const response = await fetch(`${envVars.API_HOST}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({
      name,
      user_id: 1
    })
  });

  return response.json() as Promise<IProject>;
}

export const getProjectService = async (id: number) => {
  const response = await fetch(`${envVars.API_HOST}/projects/${id}`)

  return response.json() as Promise<IProject>;
}

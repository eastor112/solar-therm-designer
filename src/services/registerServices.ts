import envVars from "../configs";
import { IRegister } from "../types/registersTypes";

export const getAllRegistersParamService = async (paramID: number | string) => {
  const response = await fetch(`${envVars.API_HOST}/register/${paramID}`);
  return response.json() as Promise<IRegister[]>;
};

export const getAllRegisterFromProjectService = async (projectID: number) => {
  const response = await fetch(`${envVars.API_HOST}/register/project/${projectID}`);
  return response.json() as Promise<IRegister[][]>;
}

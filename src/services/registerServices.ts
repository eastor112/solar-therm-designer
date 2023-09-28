import envVars from "../configs";
import { ICalculationResponse } from "../types/registersTypes";

export const getAllParamsService = async (paramID: number | string) => {
  const response = await fetch(`${envVars.API_HOST}/theoretical/calculate/params/${paramID}`);
  return response.json() as Promise<ICalculationResponse>;
};

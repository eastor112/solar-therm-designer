import envVars from "../configs";

export const getLocations = async () => {
  const response = await fetch(`${envVars.API_HOST}/locations`);
  return response.json();
}

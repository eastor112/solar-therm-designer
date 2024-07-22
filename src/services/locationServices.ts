import envVars from "../configs";

export const getLocations = async () => {
  const response = await fetch(`${envVars.API_HOST}/locations`);
  return response.json();
}


export const reverseGeocode = async (lat: number, lon: number) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
  );
  const data = await response.json();

  const newPlace =
    `${data.address.region ? data.address.region : 'Desconocido'} - ${data.address.state
    }` || 'Desconocido';

  return newPlace
};

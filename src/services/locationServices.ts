import envVars from "../configs";

export const getLocations = async () => {
  const response = await fetch(`${envVars.API_HOST}/locations`);
  return response.json();
}


export const reverseGeocode = async (lat: number, lon: number) => {
  const storageKey = 'locationData';

  const storedData = localStorage.getItem(storageKey);
  let locationList: { lat: number, lon: number, customPlace: string | null }[] = storedData ? JSON.parse(storedData) : [];

  const existingLocation = locationList.find(item => item.lat === lat && item.lon === lon);

  if (existingLocation) {
    return existingLocation.customPlace;
  }

  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
  );
  const data = await response.json();

  const newPlace =
    `${data.address.region ? data.address.region : 'Desconocido'} - ${data.address.state
    }` || 'Desconocido';

  const customPlace =
    newPlace?.replace('Province of ', '').split('-')[0].trim() || null;

  locationList.push({ lat, lon, customPlace });

  localStorage.setItem(storageKey, JSON.stringify(locationList));

  return customPlace;
};

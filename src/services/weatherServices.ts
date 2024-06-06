import envVars from "../configs";
import { IWeather, PVGISData } from "../types/locationstypes";
import dayjs from '../utils/datesUtils';

export const getWeatherDataService = async (location_id: number | undefined, date: string | null) => {
  if (!location_id || !date) {
    throw new Error("location_id is required");
  }
  const dateObj = dayjs(date, 'DD-MM-YYYY');
  const since = dateObj.startOf("day").format('YYYY-MM-DDTHH:mm:ss.SSSZ')
  const to = dateObj.endOf("day").format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  const response = await fetch(`${envVars.API_HOST}/weather?location_id=${location_id}&since=${since}&to=${to}`);
  return response.json() as Promise<IWeather[]>;
}

interface PVGISParams {
  lat: string | number;
  lon: string | number;
  year: string | number;
  angle: string | number;
  azimuth: string | number;
}

export const getWeatherPVGISData = async ({ lat, lon, year, angle, azimuth }: PVGISParams) => {
  const response = await fetch(`${envVars.API_HOST}/weather/pvgis?lat=${lat}&lon=${lon}&endyear=${year}&startyear=${year}&angle=${angle}&azimuth=${azimuth}`);
  return response.json() as Promise<PVGISData>;
}

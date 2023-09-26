import envVars from "../configs";
import { IWeather } from "../types/locationstypes";
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

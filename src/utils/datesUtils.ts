import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/es';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);

dayjs.tz.setDefault('America/Lima');

export const convertDateToIso = (date: string | null) => {
  let formattedDate = null;
  if (date) {
    if (!date.includes('-')) {
      formattedDate = dayjs(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    } else {
      formattedDate = date;
    }
  }
  return formattedDate;
};

export const convertIsoToDate = (isoDate: string) => {
  if (isoDate.includes('-')) {
    const parts = isoDate.split('-');
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${day}/${month}/${year}`;
    }
  }
  return isoDate;
};

export const formatDate = (dateTime: string | undefined) => {
  if (!dateTime) return 'no definido';

  return dayjs(dateTime).locale('es').format('DD MMM YYYY');
}

export const getRelativeDate = (dateTime: string | undefined) => {
  const localDate = dayjs.utc(dateTime).tz("America/Lima");
  return localDate.locale('es').fromNow();
}

export const transformToDayjs = (input: string) => {
  const [datePart, timePart] = input.split(':');
  const year = datePart.slice(0, 4);
  const month = datePart.slice(4, 6);
  const day = datePart.slice(6, 8);
  const hour = timePart.slice(0, 2);
  const minute = timePart.slice(2, 4);

  const isoString = `${year}-${month}-${day}T${hour}:${minute}:00Z`;
  const dateInGMTMinus5 = dayjs(isoString).tz('Etc/GMT+5');
  return dateInGMTMinus5;
};

export default dayjs;

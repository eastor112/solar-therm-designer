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
  let formatedDate = undefined;
  if (date) {
    formatedDate = dayjs(date, "DD/MM/YYYY").format("YYYY-MM-DD");
  }
  return formatedDate;
}

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

export default dayjs;

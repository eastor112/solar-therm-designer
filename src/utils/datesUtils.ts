import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

dayjs.tz.setDefault('America/Lima');

export const convertDateToIso = (date: string | null) => {
  let formatedDate = undefined;
  if (date) {
    formatedDate = dayjs(date, "DD/MM/YYYY").format("YYYY-MM-DD");
  }
  return formatedDate;
}

export const formatDate = (dateTime: string) => {
  if (!dateTime) return 'no definido';

  return dayjs(dateTime).locale('es').format('DD MMM YYYY');
}

export const getRelativeDate = (dateTime: string) => {
  const localDate = dayjs.utc(dateTime).tz("America/Lima");
  return localDate.locale('es').fromNow();
}

import dayjs from "dayjs";

export const convertDateToIso = (date: string | null) => {
  let formatedDate = undefined;
  if (date) {
    formatedDate = dayjs(date, "DD/MM/YYYY").format("YYYY-MM-DD");
  }
  return formatedDate;
}

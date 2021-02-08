import { format, fromUnixTime } from "date-fns";


export const parseDate = (unixDate: number, format: string) => {
  const date = fromUnixTime(unixDate);
  const day = format(date, format);
  return day;
};

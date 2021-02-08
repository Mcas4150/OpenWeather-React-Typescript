import { format, fromUnixTime } from "date-fns";


export const parseDate = (unixDate: number) => {
  const date = fromUnixTime(unixDate);
  const day = format(date, "EEEE");
  return day;
};

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { DATE_FORMATS } from "constants";
dayjs.extend(utc);

export const dayjsToPost = (mDate: dayjs.Dayjs) => {
  try {
    if (mDate && dayjs.isDayjs(mDate)) {
      return mDate.format(DATE_FORMATS.ISO);
    }
    throw new Error("");
  } catch (error) {
    return undefined;
  }
};

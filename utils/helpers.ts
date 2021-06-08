import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const getRelativeTime = (dateIOString: string): string => {
  return dayjs(dateIOString).fromNow();
};

export default {
  getRelativeTime,
};

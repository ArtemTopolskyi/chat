import { dayNames } from "./constants";

const getDateName = (order: number) => {
  switch (order) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
        return 'Wednesday';
    case 4:
        return 'Thursday';
    case 5:
        return 'Friday';
    case 6:
      return 'Sunday';
    default:
      return '';
  }
}

const getMonthName = (order: number) => {
  switch (order) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
        return 'April';
    case 4:
        return 'May';
    case 5:
        return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
        return 'November';
    case 11:
        return 'December';
    default:
      return '';
  }
}

export const getFormattedDate = (date: Date) => {
  const month = date.getMonth();
  const weekDay = date.getDay();
  const day = date.getDate();

  return `${getDateName(weekDay)}, ${day} of ${getMonthName(month)}`;
};

export const formatTimePoint = (point: string) => (
  point.length > 1
    ? point
    : `0${point}`
);

export const formatSendingTime = (date: Date) => (
  `${formatTimePoint(String(date.getHours()))}:${formatTimePoint(String(date.getMinutes()))}`
);

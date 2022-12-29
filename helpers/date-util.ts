import dayjs from "dayjs";

const currentDate = dayjs();

export const convertDate = (date: string): string => {
  const difference = currentDate.diff(date, "day");
  const showDate = dayjs(date);

  if (difference === 0) {
    return `Сегодня в ${showDate.format("hh:mm")}`;
  }
  if (difference === 1) {
    return `${difference} день назад`;
  }
  if (difference > 1 && difference < 5) {
    return `${difference} дня назад`;
  }
  return showDate.format("DD.MM.YYYY");
};

const leftPad = (value: number) => {
  if (value >= 10) {
    return value;
  }

  return `0${value}`;
};

export const dateToString = (date: Date) => {
  const year = date.getFullYear();
  const month = leftPad(date.getMonth() + 1);
  const day = leftPad(date.getDate());

  return [year, month, day].join("-");
};

export const addDayToDate = (targetDate: string, interval: number) => {
  const dateArray = targetDate.split("-");
  const calculatedDate = new Date(
    +dateArray[0],
    +dateArray[1] - 1,
    +dateArray[2]
  );
  calculatedDate.setDate(calculatedDate.getDate() + interval);
  return dateToString(calculatedDate);
};

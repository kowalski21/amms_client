import { DateTime } from "luxon";

export const formatFormDt = (dt) => {
  let newDt = DateTime.fromJSDate(dt);
  //   console.log(newDt);
  //   console.log(newDt.toISODate());
  return newDt.toISODate();
};

export const addOneDay = (dt) => {
  let ft = DateTime.fromISO(dt);
  return ft.plus({ days: 1 }).toISODate();
};

export const formatIsoDt = (dt) => {
  return DateTime.fromISO(dt).toISODate();
};
export const formatFullDate = (dt) => {
  return DateTime.fromISO(dt).toLocaleString(DateTime.DATETIME_FULL);
};

export const getYears = (dt) => {
  let tmp = DateTime.fromISO(dt);
  let now = DateTime.now();

  let diff = now.diff(tmp, "years").toObject();

  return Math.floor(diff["years"]);
};

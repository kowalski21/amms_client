import { DateTime } from "luxon";

export const getClientReferenceNumber = ({
  date_created,
  area_short_name,
  client_no,
}) => {
  const dt = DateTime.fromISO(date_created);
  const year = dt.toFormat("yyyy");
  const month = dt.toISODate().split("-")[1];

  const reportRef = `PHT/AMMS/${area_short_name}-${client_no}/${month}/${year}`;

  return reportRef.toUpperCase();
};

export const preparePayload = (reportObj) => {
  let payload = {};

  return payload;
};

export const getFinalizer = (meta) => {
  let fullName = `${meta?.first_name} ${meta?.last_name}`;
  let dt = DateTime.fromISO(meta?.completed);
  let timeString = dt.toLocaleString(DateTime.DATETIME_FULL);

  return `${fullName} on ${timeString}`;
};

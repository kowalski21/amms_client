import { DateTime } from "luxon";

export const getClientReferenceNumber = ({
  date_created,
  area_short_name,
  client_no,
}) => {
  const dt = DateTime.fromISO(date_created);
  const year = dt.toFormat("yyyy");

  const reportRef = `PHT/AMMS/${area_short_name}-${client_no}/${year}`;

  return reportRef;
};

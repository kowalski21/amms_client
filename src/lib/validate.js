import { DateTime } from "luxon";
import { directus } from "./api";

export const checkReport = async (input) => {
  const report = await directus.items("report").readByQuery({
    fields: "id,client,date_created",
    filter: {
      client: input.client,
    },
  });
  const today = new Date();
  const parsedDate = DateTime.fromJSDate(today);
  const year = parsedDate.toLocaleString().split("/")[2];
  //   console.log(report);
  const reports = report.data;
  console.log(reports);
  const selected = reports.pop();
  //   throw new Error(`Report has already been created for AMMS - ${year}`);
  //   selected = report?.data.pop();
  if (selected) {
    // check if date created is the same as current year
    //  if true,; raise an error
    const reportYear = DateTime.fromISO(selected.date_created)
      .toLocaleString()
      .split("/")
      .pop();
    if (reportYear === year) {
      // console.log("Cannot create the same report in the same year");
      throw new Error(`Report has already been created for AMMS - ${year}`);
    }
    //   console.log(reportYear);
    //   console.log({ year });
  }
};

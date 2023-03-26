import { useReport } from "@/hooks/report";
import React from "react";
import { Loader } from "rsuite";
import TabLinks from "./TabLinks";
import { getClientReferenceNumber } from "@/lib/utils";
import { focusManager, useMutation } from "@tanstack/react-query";
import { directus } from "@/lib/api";
import { DateTime } from "luxon";
const ReportClientCard = ({ reportId }) => {
  const { data, isLoading } = useReport({
    id: reportId,
    queryKey: ["reportDetail", reportId],
    query: {
      fields: "*,client.*,area.id,area.name,area.short_name",
    },
  });

  const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await directus
        .items("report")
        .updateOne(id, { status: "published" });
      return res;
    },
    onSuccess: (data) => {
      focusManager.setFocused(true);
    },
  });

  const handleComplete = () => {
    mutation.mutate(reportId);
  };
  const handlePrint = async () => {
    let tmp = { ...data };
    delete tmp["client"];
    delete tmp["area"];
    delete tmp["id"];
    tmp["wei"] = `${data.weight}kg`;
    tmp["height"] = `${data.height}m`;
    tmp["bp"] = `${data.bp}mmHg`;
    tmp["age"] = `${data.client.age} YEARS`;
    tmp["fbs"] = `${data.fbs}mmol/l`;
    delete tmp["weight"];
    let payload = {
      client: {
        name: `${data.client.firstname} ${data.client.middlename} ${data.client.surname}`,
        // firstname: data.client.firstname,
        // middlename: data.client.middlename,
        // surname: data.client.surname,
        ref: getClientReferenceNumber({
          date_created: data.client.date_created,
          area_short_name: data.area.short_name,
          client_no: data.client.client_no,
        }),
        dt: DateTime.fromISO(data.date_created).toISODate(),
        // age: data.client.age,
        gender: data.client.gender.toUpperCase(),
        area: data.area.name.toUpperCase(),
      },
      parameters: { ...tmp },
    };

    // console.log(payload);

    const res = await directus.transport.post(
      "http://localhost:8000/report",
      payload,
      {
        responseType: "blob",
      }
    );
    if (res.status == 200) {
      const href = URL.createObjectURL(res.raw);

      // create "a" HTML element with href to file & click
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute(
        "download",
        `${payload.client.name}_${payload.client.ref}.docx`
      ); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    }
    // console.log(res);
    // get the payload
    // send it the template microservice
    // return file and automatically download
  };
  return (
    <div class="card mb-5" style={{ borderRadius: "15px" }}>
      {data && (
        <div class="card-body p-4">
          <div className="row">
            <div className="col-md-9">
              <h3 class="mb-3">
                {data.client.firstname} {data.client.middlename}{" "}
                {data.client.surname}
              </h3>
              <p class="small mb-0">
                <i class="fe fe-book"></i> <span class="mx-2"></span>
                <strong>Age {data.client.age} </strong> |{" "}
                <strong className="text-uppercase">
                  Area : {data.area.name}
                </strong>{" "}
                <strong className="text-uppercase">
                  | Gender : {data.client.gender}{" "}
                </strong>
                {/* <strong>REF No : PHT/AMMS/EB-23/2023</strong> */}
                <strong>
                  | REF No :{" "}
                  {getClientReferenceNumber({
                    date_created: data.client.date_created,
                    area_short_name: data.area.short_name,
                    client_no: data.client.client_no,
                  })}
                </strong>
              </p>
            </div>
            <div className="col-md-3">
              {data?.status == "published" ? (
                <button
                  className="btn btn-secondary ml-2"
                  onClick={handlePrint}
                >
                  Download
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handleComplete}>
                  Mark as Completed
                </button>
              )}
            </div>
          </div>

          <hr class="my-4" />
          <TabLinks />
        </div>
      )}
      {isLoading && (
        <div className="card-body">
          <Loader center vertical />
        </div>
      )}
    </div>
  );
};

export default ReportClientCard;

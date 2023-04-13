import { useReport } from "@/hooks/report";
import React from "react";
import { Loader } from "rsuite";
import TabLinks from "./TabLinks";
import { getClientReferenceNumber } from "@/lib/utils";
import { focusManager, useMutation } from "@tanstack/react-query";
import { directus, fileApi } from "@/lib/api";
import { DateTime } from "luxon";
import { useAuthStore } from "@/stores/auth";
import { useNotify } from "@/hooks/notify";
// import PreviewModal from "./preview/PreviewModal";
const ReportClientCard = ({ reportId }) => {
  const user = useAuthStore((state) => state.user);
  const { showError, showMsg } = useNotify();

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
    tmp["bp"] = `${data.bp}`;
    tmp["age"] = `${data.client.age} YEARS`;
    tmp["fbs"] = `${data.fbs}mmol/l`;
    delete tmp["weight"];
    let payload = {
      client: {
        name: data?.client?.name,
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

    const lres = await fileApi.post("/", payload, { responseType: "blob" });
    // console.log(lres);

    // const res = await directus.transport.post(
    //   process.env.NEXT_PUBLIC_REPORT_URL,
    //   payload,
    //   {
    //     responseType: "blob",
    //   }
    // );
    // console.log(res);
    if (lres.ok) {
      const href = URL.createObjectURL(lres.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute(
        "download",
        `${payload.client.name}_${payload.client.ref}.pdf`
      ); //or any other extension

      // print(link.href);
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    } else {
      console.log(lres);
      showError("ERROR OCCURED !!, CHECK VITAL PARAMETERS");
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
              <h3 class="mb-3">{data.client.name}</h3>
              <p class="small mb-0">
                <i class="fe fe-cast"></i> <span class="mx-2"></span>
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
            {["Administrator"].includes(user?.role.name) && (
              <div className="col-md-3">
                {/* {data && <PreviewModal report={data.id} />} */}
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
            )}
          </div>

          <hr class="my-4" />
          {user && <TabLinks user={user} />}
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

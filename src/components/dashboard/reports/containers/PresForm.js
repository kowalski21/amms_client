import React from "react";
import AddPresForm from "../../meds/AddPresForm";
import PresCard from "../../meds/PresCard";
import { useMeds } from "@/hooks/meds";
import RemovePres from "../../meds/RemovePres";
import UpdatePresForm from "../../meds/UpdatePresForm";
import { useRouter } from "next/router";

const PresForm = () => {
  const router = useRouter();
  const reportId = router.query["report"];
  const { data, isLoading } = useMeds({
    queryKey: ["medications", reportId],
    query: {
      fields: "*,product.id,product.name,freq.id,freq.name",
      filter: {
        report: reportId,
      },
    },
    options: {
      enabled: reportId ? true : false,
    },
  });
  return (
    <div className="mt-2 mb-2">
      <div className="row">
        <div className="col">
          <h4> Prescriptions</h4>
        </div>
        {/* {JSON.stringify(reportId)} */}
        <div className="col">
          <AddPresForm reportId={reportId} />
        </div>
      </div>
      <hr />
      {/* {JSON.stringify(data)} */}
      <div className="row">
        <table className="table table-border">
          <thead className="thead-dark">
            <th>No</th>
            <th>Drug</th>
            <th>Strength</th>
            <th>Dose</th>
            <th>Frequency</th>
            <th>Days</th>
            <th>Update</th>
            <th>Remove</th>
          </thead>
          <tbody>
            {data?.data.map((elem, index) => {
              return (
                <tr key={elem.id}>
                  <td>{index + 1}</td>
                  <td>{elem?.product?.name}</td>
                  <td>{elem?.meta?.strength}</td>
                  <td>{elem?.dose}</td>
                  <td>{elem?.freq?.name}</td>
                  <td>{elem?.meta?.days}</td>
                  <td>
                    <UpdatePresForm pres={elem} />
                  </td>
                  <td>
                    <RemovePres pres={elem} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* {data?.data.map((elem) => {
          return (
            <div className="col-md-6">
              <PresCard med={elem} />
            </div>
          );
        })} */}
      </div>
    </div>
  );
};

export default PresForm;

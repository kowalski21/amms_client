import { useMeds } from "@/hooks/meds";
import React from "react";
import { Input } from "reactstrap";
import ServeDrug from "./ServeDrug";
import { useRouter } from "next/router";

const ListDrugs = () => {
  const router = useRouter();
  const reportId = router.query["report"];
  const { data, isLoading } = useMeds({
    queryKey: ["pharmacy", reportId],
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
    <div className="mt-3">
      <div className="row">
        <div className="col">
          <table className="table">
            <thead className="thead-dark">
              <th>No</th>
              <th>Drug</th>
              <th>Strength</th>
              <th>Dose</th>
              <th>Frequency</th>
              <th>Days</th>
              <th>Quantity Dispensed</th>
              <th>Action</th>
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
                    <td>{elem?.qty}</td>
                    <td>
                      <ServeDrug pres={elem} />
                    </td>
                    <td>{/* <RemovePres pres={elem} /> */}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListDrugs;

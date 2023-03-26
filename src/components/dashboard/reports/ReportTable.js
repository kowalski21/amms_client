import React from "react";
import { formatIsoDt } from "@/lib/date";
import { useRouter } from "next/router";
import Link from "next/link";
const ReportTable = ({ results }) => {
  const router = useRouter();
  return (
    <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
      <thead>
        <tr className="fw-bold text-muted bg-light">
          <th className="ps-4 rounded-start">Report Id</th>
          <th className="ps-4 rounded-start">First Name</th>
          <th className="min-w-100px">MiddleName</th>
          <th className="min-w-100px">Surname</th>

          <th className="w-100px">Status</th>
          <th className="w-100px">Station</th>
          <th>Created At</th>
          <th className="w-100px">Action</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result) => {
          return (
            <tr key={result.id}>
              {/* <td>{client.title}</td> */}
              <td>
                <span className="fw-bold text-hover-primary mb-1 fs-6">
                  PHT-AMMS/2023/{result.id}
                </span>
              </td>
              <td>
                <span className=" fw-bold text-hover-primary mb-1 fs-6">
                  {result.client.firstname}
                </span>
              </td>
              <td>
                <span className=" fw-bold text-hover-primary mb-1 fs-6">
                  {result.client.middlename}
                </span>
              </td>
              <td>{result.client.surname}</td>
              {/* <td className="text-uppercase">{client.gender}</td> */}
              <td className="text-uppercase">
                {result.status == "draft" && (
                  <span className="badge py-2 px-4 fs-7 badge-warning">
                    Draft
                  </span>
                )}
                {result.status == "published" && (
                  <span className="badge py-3 px-4 fs-7 badge-primary">
                    COMPLETED
                  </span>
                )}

                {result.status == "archived" && (
                  <span className="badge py-2 px-4 fs-7 badge-danger">
                    DELETED
                  </span>
                )}
              </td>
              <td className="text-uppercase">
                {/* {client?.station?.name} */}
                <span class=" fw-bold text-hover-primary">
                  {result.area?.name}
                </span>
              </td>
              <td>
                <span className="">{formatIsoDt(result.date_created)}</span>
              </td>

              <td>
                <Link href={`/dashboard/reports/${result.id}`}>
                  <button className="btn btn-primary btn-sm">View</button>
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ReportTable;

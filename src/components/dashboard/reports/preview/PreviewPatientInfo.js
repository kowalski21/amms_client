import React from "react";

const PreviewPatientInfo = ({ report }) => {
  return (
    <table className="table">
      <thead className="thead-dark">
        <th>Name</th>
        <th>Age</th>
        <th>Area</th>
        <th>Gender</th>
        <th>Reference No</th>
      </thead>
      <tbody>
        <tr>
          <td>{report?.client?.name}</td>
          <td>{report?.client?.age}</td>
          <td className="text-uppercase">{report?.area?.name}</td>
          <td className="text-uppercase">{report?.client.gender}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};

export default PreviewPatientInfo;

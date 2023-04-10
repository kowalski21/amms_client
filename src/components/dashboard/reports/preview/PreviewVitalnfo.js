import React from "react";

const PreviewVitalnfo = ({ report }) => {
  return (
    <table className="table">
      <thead className="thead-dark">
        <th>Height</th>
        <th>Weight</th>
        <th>BMI</th>
        <th>Blood Pressure</th>
      </thead>
      <tbody>
        <tr>
          <td>{report.height}</td>
          <td>{report?.weight}</td>
          <td>{report?.bp}</td>
          <td>{report?.bmi}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default PreviewVitalnfo;

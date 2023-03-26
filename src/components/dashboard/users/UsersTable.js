import React from "react";
import ModPassword from "./ModPassword";
import UpdateUser from "./UpdateUser";

const UsersTable = ({ results }) => {
  return (
    <div className="table-responsive">
      <table className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer">
        <thead className="thead-dark">
          <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
            <th className="min-w-125px">Username</th>
            <th className="min-w-125px">First Name</th>
            <th className="min-w-125px">Last Name</th>
            <th className="min-w-125px">Role</th>
            <th className="min-w-125px">Action</th>
          </tr>
        </thead>
        <tbody>
          {results.map((elem) => {
            return (
              <tr
                className="text-start fw-bold fs-7 text-uppercase gs-0"
                key={elem.id}
              >
                <td className="text-lowercase">{elem.email.split("@")[0]}</td>
                <td>{elem.first_name}</td>
                <td>{elem.last_name}</td>
                <td>{elem?.role?.name}</td>
                <td>
                  {/* <button className="btn btn-primary btn-sm me-2">
                    Update
                  </button> */}
                  <UpdateUser user={elem} />
                  <ModPassword user={elem} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;

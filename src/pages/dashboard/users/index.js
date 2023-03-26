import NewReportModal from "@/components/dashboard/reports/NewReportModal";
import ReportDisplay from "@/components/dashboard/reports/ReportDisplay";
import NewUserModal from "@/components/dashboard/users/NewUserModal";
import UsersDisplay from "@/components/dashboard/users/UsersDisplay";
import AppLayout from "@/components/layout/AppLayout";
import React from "react";

const UsersPage = () => {
  return (
    <AppLayout>
      <div className="row">
        <div className="col">
          <h3 className="text-center ">AMMS-PENTECOST HOSPITAL TARKWA</h3>
        </div>
      </div>
      <hr />
      <div class="row align-items-center my-4">
        <div class="col">
          <h2 class="h3 text-uppercase mb-0 page-title">USERS</h2>
        </div>
        <div class="col-auto">
          <NewUserModal />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <UsersDisplay />
        </div>
      </div>
    </AppLayout>
  );
};

export default UsersPage;

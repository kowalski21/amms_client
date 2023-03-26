import NewReportModal from "@/components/dashboard/reports/NewReportModal";
import ReportDisplay from "@/components/dashboard/reports/ReportDisplay";
import AppLayout from "@/components/layout/AppLayout";
import React from "react";

const ReportsPage = () => {
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
          <h2 class="h3 text-uppercase mb-0 page-title">MEDICAL REPORTS</h2>
        </div>
        <div class="col-auto">
          <NewReportModal />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ReportDisplay />
        </div>
      </div>
    </AppLayout>
  );
};

export default ReportsPage;

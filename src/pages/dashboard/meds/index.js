import AppLayout from "@/components/layout/AppLayout";
import React from "react";

const MedicalProductsPage = () => {
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
          <h2 class="h3 text-uppercase mb-0 page-title">DRUGS</h2>
        </div>
        <div class="col-auto">{/* <NewReportModal /> */}</div>
      </div>
      <div className="row">
        <div className="col">{/* <ReportDisplay /> */}</div>
      </div>
    </AppLayout>
  );
};

export default MedicalProductsPage;

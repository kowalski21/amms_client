import FormContainer from "@/components/dashboard/reports/containers/FormContainer";
// import NewReportModal from "@/components/dashboard/reports/NewReportModal";
import ReportClientCard from "@/components/dashboard/reports/ReportClientCard";
import AppLayout from "@/components/layout/AppLayout";
import { useRouter } from "next/router";
import React from "react";

const ReportPage = () => {
  const router = useRouter();
  const reportId = router.query["report"];
  return (
    <AppLayout>
      <div className="row">
        <div className="col">
          <h3 className="text-center ">AMMS-PENTECOST HOSPITAL TARKWA</h3>
        </div>
      </div>
      <hr />
      {/* {JSON.stringify(router)} */}
      <div class="row align-items-center my-4">
        <div class="col">
          <h2 class="h3 text-uppercase mb-0 page-title">MEDICAL REPORTS</h2>
        </div>
        <div class="col-auto">{/* <NewReportModal /> */}</div>
      </div>
      <div className="row">
        <div className="col">
          {reportId && <ReportClientCard reportId={reportId} />}

          {reportId && <FormContainer reportId={reportId} />}
        </div>
      </div>
    </AppLayout>
  );
};

export default ReportPage;

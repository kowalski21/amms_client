import ListAreasDisplay from "@/components/dashboard/areas/ListAreasDisplay";
import NewAreaModal from "@/components/dashboard/areas/NewAreaModal";
import AppLayout from "@/components/layout/AppLayout";
import React from "react";

const AreasDashboardPage = () => {
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
          <h2 class="h3 text-uppercase mb-0 page-title">Areas</h2>
        </div>
        <div class="col-auto">
          <NewAreaModal />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <ListAreasDisplay />
        </div>
      </div>
    </AppLayout>
  );
};

export default AreasDashboardPage;

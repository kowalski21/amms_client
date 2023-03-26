import ClientDisplay from "@/components/dashboard/clients/ClientDisplay";
import NewClientModal from "@/components/dashboard/clients/NewClientModal";
import AppLayout from "@/components/layout/AppLayout";
import React from "react";

const ClientsPage = () => {
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
          <h2 class="h3 text-uppercase mb-0 page-title">MINISTERS & WIVES</h2>
        </div>
        <div class="col-auto">
          <NewClientModal />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ClientDisplay />
        </div>
      </div>
    </AppLayout>
  );
};

export default ClientsPage;

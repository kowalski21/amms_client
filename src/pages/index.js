import AppLayout from "@/components/layout/AppLayout";
import Paginator from "@/components/reusable/Paginator";
import TotalClientsWidget from "@/components/widgets/TotalClientsWidget";
import TotalReportWidget from "@/components/widgets/TotalReportWidget";
import TotalStationsWidget from "@/components/widgets/TotalStationsWidget";
import { useAuth } from "@/hooks/auth";
import React, { useState } from "react";

const Home = () => {
  useAuth();
  const [page, setPage] = useState(1);
  const handlePageChange = (page) => {
    setPage(page);
  };
  return (
    <AppLayout>
      <div className="row">
        <div className="col">
          <h3 className="text-center ">AMMS-PENTECOST HOSPITAL TARKWA</h3>
        </div>
      </div>
      <hr />
      <div className="row justify-content-center">
        <div class="col-md-6 col-xl-3 mb-4">
          <TotalReportWidget />
        </div>

        <div class="col-md-6 col-xl-3 mb-4">
          <TotalStationsWidget />
        </div>
        <div class="col-md-6 col-xl-3 mb-4">
          <TotalClientsWidget />
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;

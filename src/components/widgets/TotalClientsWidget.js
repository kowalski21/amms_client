import { useClients } from "@/hooks/client";
import { useStations } from "@/hooks/station";
import React from "react";
import { Loader } from "rsuite";
const TotalClientsWidget = () => {
  const { data, isLoading } = useClients({
    queryKey: ["widgets", "clients"],
    query: { fields: "id", limit: 5000, meta: "*" },
  });
  return (
    <div class="card shadow border-0">
      <div class="card-body">
        {isLoading && <Loader center vertical />}
        {data && (
          <div class="row align-items-center">
            <div class="col-3 text-center">
              <span class="circle circle-sm bg-secondary">
                <i class="fe fe-16 fe-users text-white mb-0"></i>
              </span>
            </div>
            <div class="col pr-0">
              <p class="h5  fw-bold mb-0">Ministers & Wives</p>
              <span class="h3 mb-0">{data?.meta?.total_count}</span>
              {/* <span class="small text-success">+16.5%</span> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TotalClientsWidget;

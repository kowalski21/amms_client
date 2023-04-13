import Paginator from "@/components/reusable/Paginator";
import { useReports } from "@/hooks/report";
import React, { useState } from "react";
import ReportBar from "./ReportBar";
import ReportTable from "./ReportTable";

const ReportDisplay = () => {
  const [activePage, setActivePage] = useState(1);
  const [queryKey, setQueryKey] = useState({
    fields: "*,client.*,area.id,area.name,area.short_name",
    // fields: "*.*",
    limit: 10,
    meta: "*",
    page: 1,
  });
  const { data, isLoading } = useReports({
    query: queryKey,
    queryKey: ["reports", queryKey],
    options: {
      keepPreviousData: true,
    },
  });
  const handlePageChange = (val) => {
    setActivePage(val);
    setQueryKey({ ...queryKey, page: val });
  };
  const modifyQuery = (payload, activePage = 1) => {
    setQueryKey({
      ...queryKey,
      ...payload,
      page: activePage,
    });
    setActivePage(activePage);
  };
  return (
    <div className="card shadow">
      {/* {JSON.stringify(data)} */}
      <div className="card-body">
        <ReportBar handleQuery={modifyQuery} />

        <ReportTable results={data?.data ? data?.data : []} />

        <Paginator
          pageSize={10}
          onPageChange={handlePageChange}
          totalCount={data?.meta ? data?.meta?.filter_count : 1}
          currentPage={activePage}
        />
      </div>
    </div>
  );
};

export default ReportDisplay;

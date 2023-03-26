import { useReport } from "@/hooks/report";
import { useFormStore } from "@/stores/form";
import { useTabStore } from "@/stores/utils";
import React, { Fragment } from "react";
import FormLoader from "./FormLoader";
import SaveToolbar from "./SaveToolbar";
// import VitalsForm from "./VitalsForm";

const FormContainer = ({ reportId }) => {
  const initialLoader = useFormStore((state) => state.initialLoader);

  const { data, isLoading } = useReport({
    id: reportId,
    queryKey: ["reportDetail", reportId],
    query: {
      fields: "*,client.*,area.id,area.name,area.short_name",
    },
  });
  return (
    <div class="card mb-5" style={{ borderRadius: "15px" }}>
      {data && <FormLoader initial={data} reportId={data.id} />}
    </div>
  );
};

export default FormContainer;

import { useReport } from "@/hooks/report";
import { useAuthStore } from "@/stores/auth";
import { useFormStore } from "@/stores/form";
import { useTabStore } from "@/stores/utils";
import React, { Fragment } from "react";
import FormLoader from "./FormLoader";
import SaveToolbar from "./SaveToolbar";
// import VitalsForm from "./VitalsForm";

const FormContainer = ({ reportId }) => {
  // const initialLoader = useFormStore((state) => state.initialLoader);
  const user = useAuthStore((state) => state.user);

  const { data, isLoading } = useReport({
    id: reportId,
    queryKey: [
      "reportDetail",
      reportId,
      {
        fields:
          "*,client.*,area.id,area.name,area.short_name,meds.*,meds.product.id,meds.product.name,meds.freq.id,meds.freq.name",
      },
    ],
    query: {
      fields: "*,client.*,area.id,area.name,area.short_name",
      // fields: "*,",
    },
  });
  return (
    <div class="card mb-5" style={{ borderRadius: "15px" }}>
      {/* {JSON.stringify(data)} */}
      {data && <FormLoader initial={data} reportId={data.id} user={user} />}
    </div>
  );
};

export default FormContainer;

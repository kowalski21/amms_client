import { useNotify } from "@/hooks/notify";
import { directus } from "@/lib/api";
import { useTabStore } from "@/stores/utils";
import { focusManager, useMutation } from "@tanstack/react-query";
import React, { Fragment, useState } from "react";
import ConclusionForm from "./ConclusionForm";
import EyeForm from "./EyeForm";
import FurtherInvForm from "./FurtherInvForm";
import LabForm from "./LabForm";
import PEForm from "./PEForm";
import RecommendationForm from "./RecommendationForm";
import SaveToolbar from "./SaveToolbar";
import SummaryReport from "./SummaryReport";
import VitalsForm from "./VitalsForm";
const FormLoader = ({ initial, reportId }) => {
  const { showMsg } = useNotify();
  const activeTab = useTabStore((state) => state.activeTab);
  const [vitals, setVitals] = useState({
    height: initial.height,
    weight: initial.weight,
    bp: initial.bp,
    sys: initial.sys,
    dias: initial.dias,
    bmi: initial?.bmi,
  });
  const [physical, setPhysical] = useState({
    ent: initial?.ent,
    breast: initial?.breast,
    chest: initial?.chest,
    abdomen: initial?.abdomen,
    cns: initial?.cns,
    heart: initial?.heart,
  });
  const [eye, setEye] = useState({
    eye_imp: initial?.eye_imp,
    eye_reco: initial?.eye_reco,
  });
  const [lab, setLab] = useState({
    fbc: initial?.fbc,
    fbs: initial.fbs,
    widal: initial.widal ? initial.widal : "Negative",
    pap: initial.pap ? initial.pap : "Not Done",
    rdt: initial.rdt,
    hepb: initial.hepb,
    lft: initial.lft,
    kft: initial.kft,
    lipid: initial.lipid,
    urine: initial.urine,
    stool: initial.stool,
    psa: initial.psa,
  });

  const [ecg, setEcg] = useState(initial.ecg);
  const [sumCon, setSumCon] = useState({
    conclusion: initial?.conclusion,
    summary: initial?.summary,
  });
  const [summary, setSummary] = useState(initial.summary);
  const [conclusion, setConclusion] = useState(initial.conclusion);
  const [reco, setReco] = useState(initial.reco);

  const handleVitals = (key, value) => {
    setVitals({ ...vitals, [key]: value });
  };
  const handlePhysicals = (key, value) => {
    setPhysical({
      ...physical,
      [key]: value,
    });
  };
  const handleLab = (key, value) => {
    setLab({
      ...lab,
      [key]: value,
    });
  };
  const handleEye = (key, value) => {
    setEye({
      ...eye,
      [key]: value,
    });
  };
  const handleEcg = (e) => {
    setEcg(e.target.value);
  };
  const handleSumCon = (key, value) => {
    setSumCon({ ...sumCon, [key]: value });
  };
  const handleSummary = (val) => {
    setSummary(val);
  };
  const handleReco = (val) => {
    setReco(val);
  };
  const handleConclusion = (val) => {
    // setRecommendations(val);
    setConclusion(val);
  };

  const mutation = useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await directus.items("report").updateOne(id, payload);
      return res;
    },
    onSuccess: (data) => {
      showMsg("REPORT UPDATED !!");
      focusManager.setFocused(true);
    },
    onError: (error, variables) => {
      console.log(error);
      console.log(variables);
    },
  });

  const handleSave = async () => {
    let payload = {
      ...vitals,
      ...physical,
      ...lab,
      ...eye,
      ecg,
      ...sumCon,
      reco,
      conclusion,
    };
    // console.log(Object.keys(payload));

    // console.log(reportId);

    mutation.mutate({ id: reportId, payload });

    // const res = await directus
    //   .items("report")
    //   .updateOne(initialData.id, payload);

    // alert("Update Successful");
  };

  return (
    <Fragment>
      <div className="card-body">
        {activeTab == 1 && (
          <VitalsForm values={vitals} onChangeHandler={handleVitals} />
        )}
        {activeTab == 2 && (
          <PEForm
            values={physical}
            onChangeHandler={handlePhysicals}
            client={initial.client}
          />
        )}

        {activeTab == 3 && <EyeForm values={eye} onChangeHandler={handleEye} />}

        {activeTab == 4 && (
          <LabForm
            values={lab}
            onChangeHandler={handleLab}
            client={initial.client}
          />
        )}
        {activeTab == 5 && (
          <FurtherInvForm values={ecg} onChangeHandler={handleEcg} />
        )}

        {activeTab == 6 && (
          //   <ConclusionForm values={sumCon} onChangeHandler={handleSumCon} />
          <SummaryReport values={sumCon} onChangeHandler={handleSumCon} />
        )}

        {activeTab == 7 && (
          <RecommendationForm values={reco} onChangeHandler={handleReco} />
        )}
        <SaveToolbar onSaveHandler={handleSave} />
      </div>
    </Fragment>
  );
};

export default FormLoader;

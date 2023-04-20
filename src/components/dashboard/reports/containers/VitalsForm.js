import { useFormStore } from "@/stores/form";
import React, { useEffect, useState } from "react";
import { Label, InputGroup, InputGroupText, Input } from "reactstrap";
import { getBmiStatus, getBpStatus } from "@/lib/status";
import { SelectPicker } from "rsuite";
const BP_STATUS = [
  { label: "Low", value: "Low" },
  { label: "Normal", value: "Normal" },
  { label: "Elevated", value: "Elevated" },
  { label: "High", value: "High" },
];
const VitalsForm = ({ values, onChangeHandler, visual, metaHandler }) => {
  const [sys, setSys] = useState("");
  const [dias, setDias] = useState("");
  const [bmi, setBmi] = useState("");
  const getBmiValue = () => {
    if (values.height && values.weight) {
      const tmp =
        parseFloat(values.weight) /
        (parseFloat(values.height) * parseFloat(values.height));
      // setBmi(tmp.toFixed(2));
      getBmi(tmp.toFixed(2));
      return tmp.toFixed(2);
    } else {
      // setBmi("");
      getBmi("");
      return "";
    }
  };
  // const getBpValue = () => {
  //   if (values.sys && values.dias) {
  //     let mp = `${values.sys}/${values.dias}`;
  //     let mpStatus = getBpStatus(mp);
  //     onChangeHandler("bp", `${values.sys}/${values.dias}mmHg(${mpStatus})`);
  //   } else {
  //     onChangeHandler("bp", "");
  //   }
  // };

  // useEffect(() => {
  //   getBpValue();
  // }, [values.sys, values.dias]);

  useEffect(() => {
    onChangeHandler("bmi", getBmiValue());
    // getBmiValue();
  }, [values.height, values.weight]);
  // get status functions
  const getBmi = (bmi) => {
    if (bmi) {
      let bmiFloat = parseFloat(bmi);

      return getBmiStatus(bmiFloat);
    } else {
      return null;
    }
  };

  const getLocalBp = (bp) => {
    if (bp) {
      return getBpStatus(bp);
      // return bp;
    } else {
      return null;
    }
  };
  return (
    <div className="row">
      {/* {JSON.stringify(values)} */}
      <div className="col-md-2">
        <div className="form-outline mb-4">
          <Label>Temperature(Celcius)</Label>
          <input
            type="number"
            className="form-control form-control-lg"
            value={visual?.temp}
            onChange={(e) => metaHandler("temp", e.target.value)}
          />
        </div>
      </div>
      <div className="col-md-2">
        <div className="form-outline mb-4">
          <Label>Pulse(bpm)</Label>
          <input
            type="number"
            className="form-control form-control-lg"
            value={visual?.pulse}
            onChange={(e) => metaHandler("pulse", e.target.value)}
          />
        </div>
      </div>
      <div className="col-md-2">
        <div className="form-outline mb-4">
          <Label>Height(m)</Label>
          <input
            type="number"
            className="form-control form-control-lg"
            value={values.height}
            onChange={(e) => onChangeHandler("height", e.target.value)}
          />
        </div>
      </div>
      <div className="col-md-2">
        <div className="form-outline mb-4">
          <Label>Weight (kg)</Label>
          <input
            type="number"
            className="form-control form-control-lg"
            value={values.weight}
            onChange={(e) => onChangeHandler("weight", e.target.value)}
          />
        </div>
      </div>
      <div className="col-md-2">
        <div className="form-outline mb-4">
          <Label>BMI (kg/m2) ({getBmi(values.bmi)}) </Label>
          <input
            type="text"
            className="form-control form-control-lg"
            value={getBmiValue(values.height, values.weight)}
            disabled
          />
        </div>
      </div>
      <div className="col-md-3">
        <div className="form-outline mb-4">
          <Label>Blood Pressure (mmHg) ({getLocalBp(values.bp)}) </Label>
          <InputGroup>
            <Input
              placeholder="Systolic"
              value={values.sys}
              onChange={(e) => onChangeHandler("sys", e.target.value)}
              size={"lg"}
            />
            <InputGroupText>/</InputGroupText>
            <Input
              value={values.dias}
              onChange={(e) => onChangeHandler("dias", e.target.value)}
              placeholder="Diastolic"
              size="lg"
            />
          </InputGroup>
        </div>
      </div>
      <div className="col-md-3">
        <div className="form-outline mb-4">
          <Label>Blood Pressue Status </Label>
          <SelectPicker
            value={values.bp}
            data={BP_STATUS}
            onChange={(val) => onChangeHandler("bp", val)}
            block
            size="lg"
          />
        </div>
      </div>
    </div>
  );
};

export default VitalsForm;

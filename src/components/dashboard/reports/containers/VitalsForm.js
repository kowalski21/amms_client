import { useFormStore } from "@/stores/form";
import React, { useEffect, useState } from "react";
import { Label, InputGroup, InputGroupText, Input } from "reactstrap";

const VitalsForm = ({ values, onChangeHandler }) => {
  const [sys, setSys] = useState("");
  const [dias, setDias] = useState("");
  const getBmiValue = () => {
    if (values.height && values.weight) {
      const tmp = parseFloat(values.weight) / parseFloat(values.height);
      return tmp.toFixed(2);
    } else {
      return "";
    }
  };
  const getBpValue = () => {
    if (values.sys && values.dias) {
      onChangeHandler("bp", `${values.sys}/${values.dias}`);
    } else {
      onChangeHandler("bp", "");
    }
  };

  useEffect(() => {
    getBpValue();
  }, [values.sys, values.dias]);

  useEffect(() => {
    onChangeHandler("bmi", getBmiValue());
    getBmiValue();
  }, [values.height, values.weight]);
  return (
    <div className="row">
      {/* {JSON.stringify(values)} */}
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
          <Label>BMI (kg/m2) </Label>
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
          <Label>Blood Pressure (mmHg)</Label>
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
    </div>
  );
};

export default VitalsForm;

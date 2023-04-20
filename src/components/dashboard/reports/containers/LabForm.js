import { useFormStore } from "@/stores/form";
import React from "react";
// import { SelectPicker, useFormClassNames } from "rsuite";

const LabForm = ({ values, onChangeHandler, client }) => {
  //   const client = useFormStore((state) => state.client);
  return (
    <div className="">
      {/* {JSON.stringify(values)} */}
      {/* <div className="card-header">
        <div className="card-title">
          <h3>Lab Investigations</h3>
        </div>
      </div> */}
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-md-3">
            <div className="form-group mb-3">
              <label htmlFor="" className="form-label">
                Full Blood Count
              </label>
              <select
                value={values.fbc}
                onChange={(e) => onChangeHandler("fbc", e.target.value)}
                className="form-control"
              >
                {/* <option value="">Select An Option</option> */}
                <option value="Essentially Normal">Essentially Normal</option>
                <option value="Abnormal">Abnormal</option>
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group mb-3">
              <label htmlFor="" className="form-label">
                Malaria
              </label>
              <select
                value={values.rdt}
                onChange={(e) => onChangeHandler("rdt", e.target.value)}
                className="form-control"
              >
                {/* <option value="">Select An Option</option> */}
                <option value="Negative">Negative</option>
                <option value="Positive">Positive</option>
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group mb-3">
              <label htmlFor="" className="form-label">
                Hepatitis B (HBSAg)
              </label>
              <select
                value={values.hepb}
                onChange={(e) => onChangeHandler("hepb", e.target.value)}
                className="form-control"
              >
                {/* <option value="">Select An Option</option> */}
                <option value="Negative">Negative</option>
                <option value="Positive">Positive</option>
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group mb-3">
              <label htmlFor="" className="form-label">
                Liver Function Test
              </label>
              <select
                value={values.lft}
                onChange={(e) => onChangeHandler("lft", e.target.value)}
                className="form-control"
              >
                {/* <option value="">Select An Option</option> */}
                <option value="Normal">Normal</option>
                <option value="Abnormal">Abnormal</option>
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group mb-3">
              <label htmlFor="" className="form-label">
                Kidney Function Test
              </label>
              <select
                value={values.kft}
                onChange={(e) => onChangeHandler("kft", e.target.value)}
                className="form-control"
              >
                {/* <option value="">Select An Option</option> */}
                <option value="Normal">Normal</option>
                <option value="Abnormal">Abnormal</option>
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group mb-3">
              <label htmlFor="" className="form-label">
                LipoGram (Lipid Profile)
              </label>
              <select
                value={values.lipid}
                onChange={(e) => onChangeHandler("lipid", e.target.value)}
                className="form-control"
              >
                {/* <option value="">Select An Option</option> */}
                <option value="Normal">Normal</option>
                <option value="Abnormal">Abnormal</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-3">
            <div className="form-group mb-3">
              <label htmlFor="" className="form-label">
                Urine Routine Examination
              </label>
              <select
                value={values.urine}
                onChange={(e) => onChangeHandler("urine", e.target.value)}
                className="form-control"
              >
                {/* <option value="">Select An Option</option> */}
                <option value="Normal">Normal</option>
                <option value="Abnormal">Abnormal</option>
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group mb-3">
              <label htmlFor="" className="form-label">
                Stool Routine Examination
              </label>
              <select
                value={values.stool}
                onChange={(e) => onChangeHandler("stool", e.target.value)}
                className="form-control"
              >
                {/* <option value="">Select An Option</option> */}
                <option value="Normal">Normal</option>
                <option value="Abnormal">Abnormal</option>
              </select>
            </div>
          </div>
          {client?.gender == "M" ? (
            <div className="col-md-3">
              <div className="form-group mb-3">
                <label htmlFor="" className="form-label">
                  PSA (Prostrate Screening)
                </label>
                <select
                  value={values.psa}
                  onChange={(e) => onChangeHandler("psa", e.target.value)}
                  className="form-control"
                >
                  {/* <option value="">Select An Option</option> */}
                  <option value="Negative">Negative</option>
                  <option value="Positive">Positive</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="col-md-3">
              <label htmlFor="" className="form-label">
                Pap Smear (Cervival Screening)
              </label>
              <input
                value={values.pap}
                onChange={(e) => onChangeHandler("pap", e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
          )}
          <div className="col-md-3">
            <label htmlFor="" className="form-label">
              Typhoid (Widal)
            </label>
            <select
              value={values.widal}
              onChange={(e) => onChangeHandler("widal", e.target.value)}
              className="form-control"
            >
              {/* <option value="">Select An Option</option> */}
              <option value="Positive">Positive</option>
              <option value="Negative">Negative</option>
            </select>

            {/* <input
              value={values.widal}
              onChange={(e) => onChangeHandler("widal", e.target.value)}
              type="text"
              className="form-control"
            /> */}
          </div>
          <div className="col-md-3">
            <label htmlFor="" className="form-label">
              Fasting Blood Sugar (FBS) (mmol/l)
            </label>
            <input
              value={values.fbs}
              onChange={(e) => onChangeHandler("fbs", e.target.value)}
              type="text"
              className="form-control form-control"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabForm;

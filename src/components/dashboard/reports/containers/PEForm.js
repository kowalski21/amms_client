import { useFormStore } from "@/stores/form";
import React from "react";

const PEForm = ({ values, onChangeHandler, client }) => {
  //   const client = useFormStore((state) => state.client);
  return (
    <div className="card shadow">
      {/* {JSON.stringify(values)} */}
      <div className="card-header">
        <div className="card-title">
          <h4>Physical Examination / Systemic Enquiry</h4>
        </div>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="" className="form-label">
                Respiratory (Chest)
              </label>
              <input
                value={values.chest}
                type="text"
                onChange={(e) => onChangeHandler("chest", e.target.value)}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="" className="form-label">
                Ear, Nose & Throat
              </label>
              <select
                value={values.ent}
                onChange={(e) => onChangeHandler("ent", e.target.value)}
                name=""
                id=""
                className="form-control"
              >
                <option value="Normal">Normal</option>
                <option value="Abnormal">Abnormal</option>
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="" className="form-label">
                CardioVascular (Heart)
              </label>
              <select
                value={values.heart}
                onChange={(e) => onChangeHandler("heart", e.target.value)}
                name=""
                id=""
                className="form-control"
              >
                {/* <option value="">Select an Option</option> */}
                <option value="Normal Heart Sounds">Normal Heart Sounds</option>
                <option value="Abnormal Heart Sounds">
                  Abnormal HeartSounds
                </option>
              </select>
            </div>
          </div>
          {client && client?.gender == "Female" && (
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="" className="form-label">
                  Breast
                </label>
                <select
                  value={values.breast}
                  onChange={(e) => onChangeHandler("breast", e.target.value)}
                  className="form-control"
                >
                  <option value="Normal">Normal</option>
                  <option value="Abnormal">Abnormal</option>
                </select>
              </div>
            </div>
          )}
        </div>
        <div className="row mt-3">
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="" className="form-label">
                Abdomen
              </label>
              <textarea
                value={values.abdomen}
                onChange={(e) => onChangeHandler("abdomen", e.target.value)}
                className="form-control "
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="" className="form-label">
                Central Nervous System
              </label>
              <textarea
                value={values.cns}
                onChange={(e) => onChangeHandler("cns", e.target.value)}
                className="form-control "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PEForm;

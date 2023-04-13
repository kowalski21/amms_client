import { getVisualAcuityLabels } from "@/lib/eye";
import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { SelectPicker } from "rsuite";

const EyeForm = ({ values, onChangeHandler }) => {
  return (
    <div className="">
      {/* <div className="card-header">
        <div className="card-title">
          <h4>Eye Examination</h4>
        </div>
      </div> */}
      {/* {JSON.stringify(values)} */}
      <div className="card-body">
        <div className="row mb-2">
          <div className="col-12 text-center">
            <h5>Visual Acuity Examination</h5>
          </div>
          <hr />
          <div className="col-6">
            <h6>Right Eye</h6>
            <FormGroup>
              <SelectPicker data={getVisualAcuityLabels()} block />
            </FormGroup>
          </div>
          <div className="col-6">
            <h6>Left Eye</h6>
            <FormGroup>
              <SelectPicker data={getVisualAcuityLabels()} block />
            </FormGroup>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-12 text-center">
            <h5>Ocular Examination</h5>
          </div>
          <hr />
          <div className="col-6">
            <h6>Anterior Segment Right Eye</h6>
            <FormGroup>
              <Input type="textarea" />
            </FormGroup>
          </div>
          <div className="col-6">
            <h6>Anterior Segment Left Eye</h6>
            <FormGroup>
              <Input type="textarea" />
            </FormGroup>
          </div>

          <div className="col-6">
            <h6>Posterior Segment Right Eye</h6>
            <FormGroup>
              <Input type="textarea" />
            </FormGroup>
          </div>
          <div className="col-6">
            <h6>Posterior Segment Left Eye</h6>
            <FormGroup>
              <Input type="textarea" />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <h5>Diagnosis & Recommendation</h5>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="" className="form-label">
                Impression
              </label>
              {/* <input type="text" className="form-control" /> */}
              <textarea
                className="form-control"
                value={values.eye_imp}
                onChange={(e) => onChangeHandler("eye_imp", e.target.value)}
                name=""
                id=""
                cols="30"
                rows="10"
              ></textarea>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="" className="form-label">
                Recommendation
              </label>
              <textarea
                className="form-control"
                value={values.eye_reco}
                onChange={(e) => onChangeHandler("eye_reco", e.target.value)}
                name=""
                id=""
                cols="30"
                rows="10"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EyeForm;

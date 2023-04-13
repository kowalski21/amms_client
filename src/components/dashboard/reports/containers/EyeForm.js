import { getVisualAcuityLabels } from "@/lib/eye";
import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { SelectPicker } from "rsuite";

const EyeForm = ({ values, onChangeHandler, visual, handleVisual }) => {
  return (
    <div className="">
      <div className="card-body">
        <div className="row mb-2">
          <div className="col-12 text-center">
            <h5>Visual Acuity Examination</h5>
          </div>
          <hr />
          <div className="col-6">
            <h6>Right Eye</h6>
            <FormGroup>
              <SelectPicker
                value={visual.right}
                data={getVisualAcuityLabels()}
                block
                onChange={(val) => handleVisual("right", val)}
              />
            </FormGroup>
          </div>
          <div className="col-6">
            <h6>Left Eye</h6>
            <FormGroup>
              <SelectPicker
                value={visual.left}
                data={getVisualAcuityLabels()}
                block
                onChange={(val) => handleVisual("left", val)}
              />
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
              <Input
                value={visual.ant_r}
                onChange={(e) => handleVisual("ant_r", e.target.value)}
                type="textarea"
              />
            </FormGroup>
          </div>
          <div className="col-6">
            <h6>Anterior Segment Left Eye</h6>
            <FormGroup>
              <Input
                value={visual.ant_l}
                onChange={(e) => handleVisual("ant_l", e.target.value)}
                type="textarea"
              />
            </FormGroup>
          </div>

          <div className="col-6">
            <h6>Posterior Segment Right Eye</h6>
            <FormGroup>
              <Input
                value={visual.post_r}
                onChange={(e) => handleVisual("post_r", e.target.value)}
                type="textarea"
              />
            </FormGroup>
          </div>
          <div className="col-6">
            <h6>Posterior Segment Left Eye</h6>
            <FormGroup>
              <Input
                value={visual.post_l}
                onChange={(e) => handleVisual("post_l", e.target.value)}
                type="textarea"
              />
            </FormGroup>
          </div>
          {/* refraction */}
          <div className="col-6">
            <h6>Refraction Results Right Eye</h6>
            <FormGroup>
              <Input
                value={visual.ref_r}
                onChange={(e) => handleVisual("ref_r", e.target.value)}
                type="textarea"
              />
            </FormGroup>
          </div>
          <div className="col-6">
            <h6>Refraction Results Left Eye</h6>
            <FormGroup>
              <Input
                value={visual.ref_l}
                onChange={(e) => handleVisual("ref_l", e.target.value)}
                type="textarea"
              />
            </FormGroup>
          </div>
        </div>
        {/* refraction */}

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

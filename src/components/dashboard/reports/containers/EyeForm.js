import React from "react";

const EyeForm = ({ values, onChangeHandler }) => {
  return (
    <div className="card">
      {/* <div className="card-header">
        <div className="card-title">
          <h4>Eye Examination</h4>
        </div>
      </div> */}
      {/* {JSON.stringify(values)} */}
      <div className="card-body">
        <div className="row">
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

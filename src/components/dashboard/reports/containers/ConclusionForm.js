import React from "react";

const ConclusionForm = ({ values, onChangeHandler }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <h4>Conclusions</h4>
        </div>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col">
            <div className="form-group">
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                value={values}
                onChange={(e) => onChangeHandler(e.target.value)}
                className="form-control"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConclusionForm;

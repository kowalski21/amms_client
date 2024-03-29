import React from "react";

const FurtherInvForm = ({ values, onChangeHandler }) => {
  return (
    <div className="">
      <h4>Further Investigations</h4>

      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="" className="form-label">
                ECG
              </label>
              <input
                value={values}
                onChange={onChangeHandler}
                type="text"
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FurtherInvForm;

import React from "react";
import { Label } from "reactstrap";

const SummaryReport = ({ values, onChangeHandler }) => {
  return (
    <div className="">
      {/* <div className="card-header">
        <div className="card-title">
          <h4>{JSON.stringify(values)}</h4>
        </div>
      </div> */}
      <div className="card-body">
        <div className="row">
          <div className="col">
            <Label>Summary</Label>
            <div className="form-group">
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                value={values.summary}
                onChange={(e) => onChangeHandler("summary", e.target.value)}
                className="form-control"
              ></textarea>
            </div>
          </div>
          <div className="col">
            <Label>Conclusion</Label>
            <div className="form-group">
              <textarea
                cols="30"
                rows="10"
                value={values.conclusion}
                onChange={(e) => onChangeHandler("conclusion", e.target.value)}
                className="form-control"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryReport;

import React from "react";

const RecommendationForm = ({ values, onChangeHandler }) => {
  return (
    <div className="">
      <div className="card-body">
        <h4>Recommendations</h4>
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

export default RecommendationForm;

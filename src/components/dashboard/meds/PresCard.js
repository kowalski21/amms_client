import React from "react";

const PresCard = ({ med }) => {
  return (
    <div className="card shadow" style={{ borderRadius: "15px" }}>
      {JSON.stringify(med)}
      <div className="card-body">
        <h5>{med.product.name}</h5>
        {/* <p>Frequency :</p> */}
        <p className="prescription">{JSON.stringify(med.meta)}</p>
        <p>{med.meta.quantity}</p>
      </div>
    </div>
  );
};

export default PresCard;

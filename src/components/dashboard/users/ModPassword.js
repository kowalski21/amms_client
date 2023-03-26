import React, { Fragment, useState } from "react";

const ModPassword = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  return (
    <Fragment>
      <button className="btn btn-secondary btn-sm ml-2">Change Password</button>
    </Fragment>
  );
};

export default ModPassword;

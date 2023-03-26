import React from "react";

const SaveToolbar = ({ onSaveHandler }) => {
  const handleSave = async () => {
    onSaveHandler();
  };
  return (
    <div className="d-flex flex-row flex-end">
      <button className="btn btn-primary " onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default SaveToolbar;

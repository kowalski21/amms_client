import React from "react";
import { useState } from "react";
import { InputPicker } from "rsuite";

const GenderSelectForm = ({ initial, onChangeHandler }) => {
  const [value, setValue] = useState(initial);
  const handleChange = (val) => {
    if (onChangeHandler) {
      onChangeHandler(val);
    }
    setValue(value);
  };
  const data = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];
  return <InputPicker value={initial} onChange={handleChange} data={data} />;
};

export default GenderSelectForm;

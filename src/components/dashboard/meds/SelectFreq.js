import { usePresMeta } from "@/hooks/meds";
import React from "react";
import { useState } from "react";
import { SelectPicker } from "rsuite";
const SelectFreq = ({ inital, onChangeHandler }) => {
  const [val, setVal] = useState(inital);
  const { data, isLoading } = usePresMeta({
    queryKey: ["frequency", "select"],
  });
  const handleChange = (val) => {
    setVal(val);
    if (onChangeHandler) {
      onChangeHandler(val);
    }
  };
  return (
    <SelectPicker
      loading={isLoading}
      block
      data={data ? data?.data : []}
      labelKey="name"
      valueKey="id"
      value={val}
      onChange={handleChange}
    />
  );
};

export default SelectFreq;

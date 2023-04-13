import { useStations } from "@/hooks/station";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { SelectPicker } from "rsuite";

const AreaSelectForm = ({ initial, onChangeHandler, size = "md" }) => {
  const [value, setValue] = useState(initial);
  const handleChange = (val) => {
    setValue(value);
    if (onChangeHandler) {
      onChangeHandler(val);
    }
  };
  [
    ["stationSelectTemplate"],
    {
      fields: "id,name,short_name",
      limit: 400,
    },
  ];
  const { data, isLoading } = useStations({
    queryKey: ["stationSelectTemplate"],
    query: {
      fields: "id,name,short_name",
      limit: 400,
    },
  });
  return (
    <SelectPicker
      loading={isLoading}
      onChange={handleChange}
      size={size}
      block
      data={data?.data}
      value={initial}
      labelKey="name"
      valueKey="id"
    />
  );
};

export default AreaSelectForm;

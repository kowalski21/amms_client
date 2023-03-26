import { useRole, useRoles } from "@/hooks/roles";
import React, { useState } from "react";
import { SelectPicker } from "rsuite";

const RoleSelectForm = ({ initial, onChangeHandler, size = "lg" }) => {
  const [value, setValue] = useState(initial);
  const handleChange = (val) => {
    setValue(value);
    if (onChangeHandler) {
      onChangeHandler(val);
    }
  };
  const { data, isLoading } = useRoles({
    queryKey: ["formRoles"],
    query: {
      fields: "id,name",
      limit: 30,
    },
  });
  return (
    <SelectPicker
      loading={isLoading}
      labelKey="name"
      valueKey="id"
      size={size}
      value={initial}
      onChange={handleChange}
      data={data?.data ? data?.data : []}
      block
    />
  );
};

export default RoleSelectForm;

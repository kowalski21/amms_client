import { useProducts } from "@/hooks/meds";
import React, { Fragment, useState } from "react";
import { SelectPicker } from "rsuite";

const SelectProduct = ({ initial, onChangeHandler }) => {
  const [product, setProduct] = useState(initial);
  const [query, setQuery] = useState({
    fields: "id,name",
  });
  const handleSearch = (val) => {
    if (val) {
      setQuery({ ...query, search: val });
    } else {
      setQuery({
        fields: "id,name",
      });
    }
  };

  const handleSelect = (value, item) => {
    console.log({ value, item });
    setProduct(value);
    if (onChangeHandler) {
      onChangeHandler(value);
    }
  };
  const handleOnChange = (value) => {
    console.log(value);
  };

  const { data, isLoading } = useProducts({
    queryKey: ["productSearch", query],
  });
  return (
    <Fragment>
      {/* {JSON.stringify(product)} */}
      <SelectPicker
        data={data ? data?.data : []}
        loading={isLoading}
        value={product}
        block
        labelKey="name"
        valueKey="id"
        onSelect={handleSelect}
        onChange={handleOnChange}
        onSearch={handleSearch}
      />
    </Fragment>
  );
};

export default SelectProduct;

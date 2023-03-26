import React, { Fragment, useState } from "react";
import { Input } from "reactstrap";

import UsersTable from "./UsersTable";
import { useUsers } from "@/hooks/roles";

const UsersDisplay = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const handlePage = (val) => {
    setPage(val);
    setQuery({ ...query, page: page });
  };
  const [query, setQuery] = useState({
    fields: "id,email,first_name,last_name,role.id,role.name",
    meta: "*",
  });
  const { data } = useUsers(["usersManage", query], query, {
    keepPreviousData: true,
  });

  const handleSearch = (e) => {
    setSearch(e.target.value);
    let payload;
    let value = e.target.value;
    if (value) {
      setQuery({ ...query, search: value, page: 1 });
    } else {
      setQuery({
        fields: "id,email,first_name,last_name,role.id,role.name",
        meta: "*",
      });
    }
  };
  return (
    <div className="card">
      <div className="card-header border-0 pt-6">
        <div class="card-title">
          <div class="d-flex align-items-center position-relative my-1">
            <Input
              name="searchRandom"
              placeholder="Search Users"
              value={search}
              key="username"
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
      <div className="card-body py-4">
        <UsersTable results={data?.data ? data.data : []} />
      </div>
    </div>
  );
};

export default UsersDisplay;

import Paginator from "@/components/reusable/Paginator";
import AreaSelectForm from "@/components/templates/AreaSelectForm";
import { useClients } from "@/hooks/client";
import React, { useState } from "react";
import { Label } from "reactstrap";
import { Loader } from "rsuite";
import UpdateClientModal from "./UpdateClientModal";

const ClientDisplay = () => {
  const [area, setArea] = useState("");
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState({
    fields: "*,area.id,area.name,area.short_name",
    filter: {},
    limit: 3,
    meta: "*",
  });
  const handleQuery = () => {
    let payloadQuery = { ...query };
    if (name) {
      payloadQuery.search = name;
    } else {
      delete payloadQuery.search;
    }
    if (area) {
      payloadQuery.filter = { _and: [{ area: area }] };
    } else {
      payloadQuery.filter = {};
    }
    setQuery(payloadQuery);
  };
  const { data, isLoading } = useClients({
    query,
    queryKey: ["clients", query],
    options: {
      keepPreviousData: true,
    },
  });
  const handlePageChange = (page) => {
    setPage(page);
    setQuery({ ...query, page });
  };
  return (
    <div className="card shadow">
      {/* {JSON.stringify(data)} */}
      {/* {JSON.stringify({ area })} */}

      {isLoading && (
        <div className="card-body">
          <Loader center />
        </div>
      )}
      <div className="card-body">
        <div className="row toolbar">
          <div className="col-md-5">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control form-control"
            />
            <Label className="mt-2">Search</Label>
          </div>
          <div className="col-md-5">
            <AreaSelectForm
              initial={area}
              onChangeHandler={setArea}
              size="md"
            />
          </div>
          <div className="col">
            <button className="btn btn-primary " onClick={handleQuery}>
              Search
            </button>
          </div>
        </div>
        <table className=" table table-bordered">
          <thead>
            <th>Name</th>
            <th>Ref Number</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Area</th>
            <th>Action</th>
          </thead>
          <tbody>
            {data?.data.map((elem) => {
              return (
                <tr key={elem.id}>
                  <td>{elem.fullname}</td>
                  <td>
                    {elem.area.short_name}/{elem.client_no}
                  </td>
                  <td>{elem.gender}</td>
                  <td>{elem.age}</td>
                  <td>{elem.area.name}</td>
                  <td>
                    {/* <button className="btn btn-primary btn-sm">Update</button> */}
                    <UpdateClientModal initial={elem} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Paginator
          totalCount={data?.meta?.filter_count ? data?.meta?.filter_count : 1}
          pageSize={3}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ClientDisplay;

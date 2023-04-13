import Paginator from "@/components/reusable/Paginator";
import { useStations } from "@/hooks/station";
import { directus } from "@/lib/api";
import { focusManager, useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import UpdateAreaModal from "./UpdateAreaModal";

const ListAreasDisplay = () => {
  const LIMIT = 50;
  const updateMutation = useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await directus.items("station").updateOne(id, payload);
    },
    onSuccess: () => {
      focusManager.setFocused(true);
    },
  });
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState({
    fields: "*",
    limit: LIMIT,
    meta: "*",
  });

  const handleSearch = (e) => {
    let value = e.target.value;
    if (value) {
      setQuery({ ...query, search: value });
    } else {
      setQuery({
        fields: "*",
        limit: LIMIT,
        meta: "*",
      });
    }
  };

  const handlePageChange = (val) => {
    setQuery({ ...query, page: val });
    setPage(val);
  };
  const handleFreezeStatus = (id, payload) => {
    updateMutation.mutate({ id, payload });
  };
  const { data, isLoading } = useStations({
    queryKey: ["stations", query],
    query,
    options: {
      keepPreviousData: true,
    },
  });

  return (
    <div className="card shadow">
      {/* ListAreasDisplay */}
      {/* {JSON.stringify(data)} */}
      <div className="card-body">
        <div className="toolbar row mb-3">
          <div className="col">
            <div className="form-group col-md-6">
              <input
                type="text"
                class="form-control w-100"
                id="search"
                onChange={handleSearch}
                placeholder="Search"
              />
            </div>
          </div>
        </div>
        <table className="table table-bordered">
          <thead className="thead-dark">
            <th>Area</th>
            <th>Short Name</th>
            <th>Action</th>
          </thead>

          <tbody>
            {data?.data.map((elem) => {
              return (
                <tr key={elem.id}>
                  <td>{elem.name.toUpperCase()}</td>
                  <td>{elem.short_name}</td>
                  <td>
                    {/* <button className="btn btn-primary btn-sm">Update</button> */}
                    <UpdateAreaModal area={elem} />

                    {elem.status == "published" ? (
                      <button
                        className="btn btn-danger btn-sm mx-2"
                        onClick={() =>
                          handleFreezeStatus(elem.id, {
                            status: "draft",
                          })
                        }
                      >
                        Freeze
                      </button>
                    ) : (
                      <button
                        className="btn btn-secondary btn-sm mx-2"
                        onClick={() =>
                          handleFreezeStatus(elem.id, {
                            status: "published",
                          })
                        }
                      >
                        Unfreeze
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {data && data?.meta && (
          <Paginator
            totalCount={data?.meta?.filter_count}
            pageSize={4}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default ListAreasDisplay;

import { useClients } from "@/hooks/client";
import { useStations } from "@/hooks/station";
import React, { useState } from "react";
import { SelectPicker } from "rsuite";
const ReportBar = ({ handleQuery }) => {
  const [station, setStation] = useState("");
  const [stations, setStations] = useState([]);
  const [sDate, setSDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [client, setClient] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [queryKey, setQueryKey] = useState({
    fields: "*,area.id,area.name",
    limit: 10,
    meta: "*",
    filter: {},
  });
  const handleClientChange = (val) => {
    setClient(val);
  };
  const handleStatus = (val) => {
    setStatus(val);
  };
  useStations({
    queryKey: ["form", "stations"],
    query: { fields: "id,name" },
    options: {
      onSuccess: (data) => {
        setStations(data.data);
      },
    },
  });
  const handleStationSelect = (val) => {
    setStation(val);
  };
  const handleSearch = () => {
    // const temp = checkDate(sDate, endDate);
    let payload = [];
    if (station) {
      payload.push({
        area: station,
      });
    }
    if (client) {
      payload.push({ client: client });
    }
    if (status) {
      payload.push({ status: status });
    }

    handleQuery({
      filter: {
        _and: payload,
      },
    });
  };
  const { data, isLoading, error } = useClients({
    queryKey: ["searchReportsClients", queryKey],
    query: queryKey,
    options: {
      keepPreviousData: true,
    },
  });
  const handleClientSearch = (keyword, e) => {
    setSearch(keyword);
    if (keyword) {
      setQueryKey({ ...queryKey, search: keyword });
    } else {
      setQueryKey({
        fields: "*,area.id,area.name",
        limit: 10,
        meta: "*",
        filter: {},
      });
    }
  };
  return (
    <div>
      <div className="row mt-3 align-items-center ">
        <div class="col">
          <div class="form-group ">
            <span>
              <h6>Filter By Area</h6>
            </span>
            {/* {JSON.stringify(stations)} */}
            <SelectPicker
              labelKey="name"
              valueKey="id"
              className="w-100"
              data={stations}
              value={station}
              onChange={handleStationSelect}
            />
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <div class="form-group ">
              <span>
                <h6>Filter By Minister & Wives </h6>
              </span>
            </div>
            <SelectPicker
              onSearch={handleClientSearch}
              // onChange={handleSearch}
              onChange={handleClientChange}
              value={client}
              data={data ? data.data : []}
              //   onSelect={handleSelectedOption}
              labelKey="name"
              valueKey="id"
              className="w-100"
            />
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <div class="form-group ">
              <span>
                <h6>Filter By Report Status </h6>
              </span>
            </div>
            <SelectPicker
              onChange={handleStatus}
              value={status}
              data={[
                { label: "Draft", value: "draft" },
                { label: "Completed", value: "published" },
              ]}
              //   onSelect={handleSelectedOption}
              className="w-100"
            />
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label htmlFor="" className="form-label">
              Search
            </label>
            <br />
            <button className="btn btn-primary btn-sm" onClick={handleSearch}>
              {" "}
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportBar;

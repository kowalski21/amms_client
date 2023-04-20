import AreaSelectForm from "@/components/templates/AreaSelectForm";
import { SelectPicker } from "rsuite";
import { Input } from "reactstrap";
import { useClients } from "@/hooks/client";
import { useNotify } from "@/hooks/notify";
import { useStations } from "@/hooks/station";
import { directus } from "@/lib/api";
import { focusManager, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
// import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Modal } from "rsuite";
import { checkReport } from "@/lib/validate";

const NewReportModal = () => {
  const router = useRouter();
  const { showMsg, showError } = useNotify();

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const [client, setClient] = useState();
  const [station, setStation] = useState();
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    client: "",
    area: "",
    status: "draft",
  });

  const [msg, setMsg] = useState("");
  const [queryKey, setQueryKey] = useState({
    fields: "*,area.id,area.name",
    search: search,
    limit: 100,
  });

  useEffect(() => {
    if (search) {
      setQueryKey({ ...queryKey, search: search });
    }
  }, [search]);
  const handleSearch = (keyword) => {
    setSearch(keyword);
    // setQueryKey({ ...queryKey, search: keywor });
    // if (keyword) {
    //   setQueryKey({ ...queryKey, search: keyword });
    // } else {
    //   setQueryKey({
    //     fields: "*,area.id,area.name",
    //     limit: 10,
    //   });
    // }
  };

  const handleSelectedOption = (value, item, event) => {
    console.log(item);
    setClient(client);

    setForm({ ...form, area: item?.area?.id, client: value });
    // setClient(value);
    // console.log(value);
  };

  const handleFormChange = (key, value) => {
    setMsg("");
    setForm({ ...form, [key]: value });
  };
  const createMutation = useMutation({
    mutationFn: async (payload) => {
      await checkReport(payload);

      const res = await directus.items("report").createOne(payload);
      return res;
    },
    onSuccess: (data) => {
      toggle();
      showMsg("NEW report CREATED !!!");
      router.push(`/dashboard/reports/${data.id}`);
      //   focusManager.setFocused(true);
    },
    onError: (error) => {
      console.log(error?.message);
      let msg = error?.message
        ? error?.message
        : "Error Occured!!,contact IT Team";
      showError(msg);
    },
  });
  const handleSubmit = () => {
    let payload = { client: form.client, area: form.area };
    createMutation.mutate(payload);
  };
  const handleArea = (val) => {
    handleFormChange("area", val);
  };
  const validateForm = () => {
    return form.client && form.area;
  };
  const handleClientChange = (val) => {
    setClient(val);
  };

  const { data, isLoading, error } = useClients({
    queryKey: ["formAddReport", queryKey],
    query: queryKey,
  });
  return (
    <Fragment>
      <button type="button" class="btn btn-primary" onClick={toggle}>
        <span class="fe fe-filter fe-12 mr-2"></span>Create
      </button>
      <Modal open={modal} onClose={toggle} backdrop="static">
        {/* {JSON.stringify({ form, client })} */}
        <Modal.Header>
          <Modal.Title>New Medical Report</Modal.Title>
        </Modal.Header>
        <hr />
        <Modal.Body>
          <div className="row w-100">
            <div className="col-12">
              <div class="form-outline mb-4">
                <SelectPicker
                  onSearch={handleSearch}
                  // onChange={handleSearch}
                  onChange={handleClientChange}
                  value={client}
                  data={data ? data.data : []}
                  onSelect={handleSelectedOption}
                  labelKey="name"
                  valueKey="id"
                  className="w-100"
                />
                <label class="form-label mt-2">Client</label>
              </div>
            </div>
            <div className="col-12">
              <div class="form-outline mb-4">
                {/* <Input value={form.area} disabled /> */}
                <AreaSelectForm
                  initial={form.area}
                  onChangeHandler={handleArea}
                />
                <label class="form-label mt-2">Area</label>
              </div>
            </div>
          </div>
        </Modal.Body>
        <hr />
        <Modal.Footer>
          {validateForm() && (
            <button className="btn btn-primary" onClick={handleSubmit}>
              New Medical Report
            </button>
          )}
          <button className="btn btn-secondary mx-2" onClick={toggle}>
            Cancel{" "}
          </button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default NewReportModal;

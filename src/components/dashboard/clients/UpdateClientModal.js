import AreaSelectForm from "@/components/templates/AreaSelectForm";
import GenderSelectForm from "@/components/templates/GenderSelectForm";
import { useNotify } from "@/hooks/notify";
import { directus } from "@/lib/api";
import { focusManager, useMutation } from "@tanstack/react-query";
import React, { Fragment, useState } from "react";
// import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Modal } from "rsuite";

const UpdateClientModal = ({ initial }) => {
  const { showMsg } = useNotify();
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const [form, setForm] = useState({
    name: initial?.name,
    middlename: initial?.middlename,
    surname: initial?.surname,
    mobile: initial?.mobile,
    client_no: initial?.client_no,
    age: initial?.age,
    gender: initial?.gender,
    area: initial?.area?.id,
    status: "published",
  });
  const [msg, setMsg] = useState("");

  const handleFormChange = (key, value) => {
    setMsg("");
    setForm({ ...form, [key]: value });
  };
  const createMutation = useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await directus.items("client").updateOne(id, payload);
      return res;
    },
    onSuccess: (data) => {
      toggle();
      showMsg("client information CREATED !!!");
      focusManager.setFocused(true);
    },
  });
  const handleSubmit = () => {
    // form.name = form.name.toLowerCase();
    createMutation.mutate({ id: initial.id, payload: form });
  };
  const handleGender = (val) => {
    handleFormChange("gender", val);
  };
  const handleArea = (val) => {
    handleFormChange("area", val);
  };
  const validateForm = () => {
    return form.age && form.client_no && form.name && form.gender && form.area;
  };
  return (
    <Fragment>
      <button type="button" class="btn btn-primary btn-sm" onClick={toggle}>
        <span class="fe fe-filter fe-12 mr-2"></span>Update
      </button>
      <Modal open={modal} onClose={toggle} backdrop="static">
        {/* {JSON.stringify(form)} */}
        <Modal.Header>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <hr />
        <Modal.Body>
          <div className="row w-100">
            <div className="col">
              <div class="form-outline mb-4">
                <input
                  type="text"
                  class="form-control form-control-md"
                  onChange={(e) => handleFormChange("name", e.target.value)}
                  value={form.name}
                />
                <label class="form-label mt-2">Name</label>
              </div>
            </div>
            <div className="col">
              <div class="form-outline mb-4">
                <input
                  type="text"
                  class="form-control form-control-md"
                  onChange={(e) => handleFormChange("mobile", e.target.value)}
                  value={form.mobile}
                />
                <label class="form-label mt-2">Mobile</label>
              </div>
            </div>
          </div>
          <div className="row w-100">
            <div className="col">
              <div class="form-outline mb-4">
                <input
                  type="text"
                  class="form-control form-control-md"
                  onChange={(e) => handleFormChange("age", e.target.value)}
                  value={form.age}
                />
                <label class="form-label mt-2">Age</label>
              </div>
            </div>
            <div className="col">
              <div class="form-outline mb-4">
                <input
                  type="number"
                  class="form-control form-control-md"
                  onChange={(e) =>
                    handleFormChange("client_no", e.target.value)
                  }
                  value={form.client_no}
                />
                <label class="form-label mt-2">Client No</label>
              </div>
            </div>
            <div className="col">
              <div class="form-outline mb-4">
                <GenderSelectForm
                  initial={form.gender}
                  onChangeHandler={handleGender}
                />
                <label class="form-label mt-2">Gender</label>
              </div>
            </div>
            <div className="col-12">
              <div class="form-outline mb-4">
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
              Update
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

export default UpdateClientModal;

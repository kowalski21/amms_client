import { useNotify } from "@/hooks/notify";
import { directus } from "@/lib/api";
import { focusManager, useMutation } from "@tanstack/react-query";
import React, { Fragment, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const UpdateAreaModal = ({ area }) => {
  const { showMsg } = useNotify();
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const [form, setForm] = useState({
    name: area.name,
    short_name: area.short_name,
    status: "published",
  });
  const [msg, setMsg] = useState("");

  const handleFormChange = (key, value) => {
    setMsg("");
    setForm({ ...form, [key]: value });
  };
  const updateMutation = useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await directus.items("station").updateOne(id, payload);
    },
    onSuccess: (data) => {
      toggle();
      showMsg("AREA updated !!!");
      focusManager.setFocused(true);
    },
  });
  const handleSubmit = () => {
    form.name = form.name.toLowerCase();
    updateMutation.mutate({ id: area.id, payload: form });
  };
  return (
    <Fragment>
      <button type="button" class="btn btn-primary btn-sm" onClick={toggle}>
        <span class="fe fe-filter fe-12 mr-2"></span>Update
      </button>
      <Modal isOpen={modal} toggle={toggle} size="sm">
        <ModalHeader>Update Area</ModalHeader>
        <ModalBody>
          <div class="form-outline mb-4">
            <input
              type="text"
              class="form-control form-control-md"
              onChange={(e) => handleFormChange("name", e.target.value)}
              value={form.name}
            />
            <label class="form-label mt-2">Name</label>
          </div>
          <div class="form-outline mb-4">
            <input
              type="text"
              class="form-control form-control-md"
              onChange={(e) => handleFormChange("short_name", e.target.value)}
              value={form.short_name}
            />
            <label class="form-label mt-2">ShortName</label>
          </div>
        </ModalBody>
        <ModalFooter>
          {form.name && form.short_name && (
            <button className="btn btn-primary" onClick={handleSubmit}>
              Update
            </button>
          )}
          <button className="btn btn-secondary" onClick={toggle}>
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default UpdateAreaModal;

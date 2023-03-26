import { useNotify } from "@/hooks/notify";
import { directus } from "@/lib/api";
import { focusManager, useMutation } from "@tanstack/react-query";
import React, { Fragment, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const NewAreaModal = () => {
  const { showMsg } = useNotify();
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const [form, setForm] = useState({
    name: "",
    short_name: "",
    status: "published",
  });
  const [msg, setMsg] = useState("");

  const handleFormChange = (key, value) => {
    setMsg("");
    setForm({ ...form, [key]: value });
  };
  const createMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await directus.items("station").createOne(payload);
    },
    onSuccess: (data) => {
      toggle();
      showMsg("NEW AREA CREATED !!!");
      focusManager.setFocused(true);
    },
  });
  const handleSubmit = () => {
    form.name = form.name.toLowerCase();
    createMutation.mutate(form);
  };
  return (
    <Fragment>
      <button type="button" class="btn btn-primary" onClick={toggle}>
        <span class="fe fe-filter fe-12 mr-2"></span>Create
      </button>
      <Modal isOpen={modal} toggle={toggle} size="sm">
        <ModalHeader>New Area Registration</ModalHeader>
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
              Save
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

export default NewAreaModal;

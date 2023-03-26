import RoleSelectForm from "@/components/templates/RoleSelectForm";
import { useNotify } from "@/hooks/notify";
import React, { Fragment, useState } from "react";
import { Modal } from "rsuite";
import { useMutation } from "@tanstack/react-query";
import { directus } from "@/lib/api";
import { focusManager } from "@tanstack/react-query";
const NewUserModal = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const [msg, setMsg] = useState("");
  const { showMsg } = useNotify();
  const createMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await directus.items("directus_users").createOne(payload);
      return res;
    },
    onSuccess: (data) => {
      toggle();
      resetForm();
      showMsg("NEW USER CREATED !!!");
      focusManager.setFocused(true);
    },
  });
  const handleSubmit = () => {
    // form.name = form.name.toLowerCase();
    form.email = `${form.username}@gmail.com`;
    createMutation.mutate(form);
  };

  const [form, setForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    role: "",
  });

  const resetForm = () => {
    setForm({
      username: "",
      first_name: "",
      last_name: "",
      password: "",
      role: "",
    });
  };

  const validateForm = () => {
    return form.role && form.first_name && form.last_name && form.username;
  };
  const handleFormChange = (key, value) => {
    setMsg("");
    setForm({ ...form, [key]: value });
  };
  return (
    <Fragment>
      <button type="button" class="btn btn-primary" onClick={toggle}>
        <span class="fe fe-filter fe-12 mr-2"></span>Create
      </button>
      <Modal open={modal} onClose={toggle} backdrop="static">
        <Modal.Header>
          <Modal.Title>New User </Modal.Title>
        </Modal.Header>
        <hr />
        <Modal.Body>
          <div className="row w-100">
            <div className="col">
              <div class="form-outline mb-4 mt-2 ml-2">
                <input
                  type="text"
                  class="form-control form-control-md"
                  onChange={(e) =>
                    handleFormChange("first_name", e.target.value)
                  }
                  value={form.first_name}
                />
                <label class="form-label mt-2">First Name</label>
              </div>
            </div>
            <div className="col">
              <div class="form-outline mb-4 mt-2 ml-2">
                <input
                  type="text"
                  class="form-control form-control-md"
                  onChange={(e) =>
                    handleFormChange("last_name", e.target.value)
                  }
                  value={form.last_name}
                />
                <label class="form-label mt-2">Surname</label>
              </div>
            </div>
          </div>
          <div className="row w-100">
            <div className="col">
              <div class="form-outline mb-4 mt-2 ml-2">
                <input
                  type="text"
                  class="form-control form-control-md"
                  onChange={(e) => handleFormChange("username", e.target.value)}
                  value={form.username}
                />
                <label class="form-label mt-2">Username</label>
              </div>
            </div>
            <div className="col">
              <div class="form-outline mb-4 mt-2 ml-2">
                <input
                  type="text"
                  class="form-control form-control-md"
                  onChange={(e) => handleFormChange("password", e.target.value)}
                  value={form.password}
                />
                <label class="form-label mt-2">Password</label>
              </div>
            </div>
          </div>
          <div className="row w-100">
            <div className="col">
              <div class="form-outline mb-4 mt-2 ml-2">
                <RoleSelectForm
                  initial={form.role}
                  onChangeHandler={(val) => handleFormChange("role", val)}
                />

                <label class="form-label mt-2">Role</label>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {validateForm() && (
            <button className="btn btn-primary" onClick={handleSubmit}>
              Save
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

export default NewUserModal;

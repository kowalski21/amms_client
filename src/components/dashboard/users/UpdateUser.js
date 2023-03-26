import { useRoles } from "@/hooks/roles";
import { directus } from "@/lib/api";
import { focusManager, useMutation } from "@tanstack/react-query";
import React, { Fragment, useState } from "react";
import { Label } from "reactstrap";
import {
  Modal,
  Form,
  ButtonToolbar,
  Button,
  Input,
  SelectPicker,
} from "rsuite";

const UpdateUser = ({ user }) => {
  const { data } = useRoles({
    queryKey: ["formUserRoles"],
    query: {
      fields: "id,name",
    },
  });
  const [form, setForm] = useState({
    email: user.email.split("@")[0],
    role: user?.role?.id,
    first_name: user?.first_name,
    last_name: user?.last_name,
  });
  const resetForm = () => {
    setForm({
      role: "",
      email: "",
      first_name: "",
      last_name: "",
      password: "",
    });
  };
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  const mutation = useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await directus.users.updateOne(id, payload);
      return res;
    },
    onSuccess: (data) => {
      //   resetForm();
      toggle();
      focusManager.setFocused(true);
    },
  });

  const handleSubmit = () => {
    let payload = { ...form };
    payload.email = `${form.email}@gmail.com`;
    mutation.mutate({ id: user.id, payload });
  };
  return (
    <Fragment>
      <button className="btn btn-primary btn-sm me-2" onClick={toggle}>
        Update User
      </button>
      <Modal open={open} onClose={toggle} size="xs">
        <Modal.Header>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <hr />
        <Modal.Body>
          {/* {JSON.stringify(form)} */}
          <Form fluid onChange={setForm} formValue={form}>
            <Form.Group controlId="name">
              <Label>Username</Label>
              <Form.Control name="email" />
              <Form.HelpText>Username is required</Form.HelpText>
            </Form.Group>

            <Form.Group controlId="name">
              <Label>First Name</Label>
              <Form.Control name="first_name" />
            </Form.Group>
            <Form.Group controlId="password">
              <Label>Last Name</Label>
              <Form.Control
                name="last_name"
                // type="password"
                autoComplete="off"
              />
            </Form.Group>
            {data && data?.data && (
              <Form.Group controlId="name">
                <Label>Role</Label>
                <Form.Control
                  name="role"
                  data={data?.data}
                  labelKey="name"
                  valueKey="id"
                  accepter={SelectPicker}
                  block
                />
              </Form.Group>
            )}

            <Form.Group>
              {form.role && form.email && (
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={handleSubmit}
                >
                  Update
                </button>
              )}
              <Button appearance="default" onClick={toggle}>
                Cancel
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default UpdateUser;

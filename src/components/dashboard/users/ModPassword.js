import { useNotify } from "@/hooks/notify";
import { directus } from "@/lib/api";
import { focusManager, useMutation } from "@tanstack/react-query";
import React, { Fragment, useState } from "react";
import {
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

const ModPassword = ({ user }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const { showError, showMsg } = useNotify();
  const [password, setPassword] = useState("");
  const mutation = useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await directus.items("directus_users").updateOne(id, payload);
      return res;
    },
    onSuccess: (data) => {
      focusManager.setFocused(true);
      setPassword("");
      showMsg("password has been updated");
      toggle();
    },
  });

  const handleSubmit = () => {
    mutation.mutate({ id: user.id, payload: { password } });
  };
  return (
    <Fragment>
      <button className="btn btn-secondary btn-sm ml-2" onClick={toggle}>
        Change Password
      </button>
      <Modal isOpen={modal} toggle={toggle} size="sm">
        <ModalHeader>Update User Password</ModalHeader>
        <ModalBody>
          <Label>New Password</Label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          {password && (
            <button className="btn btn-primary btn-sm" onClick={handleSubmit}>
              Change Password
            </button>
          )}
          <button className="btn btn-secondary btn-sm" onClick={toggle}>
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default ModPassword;

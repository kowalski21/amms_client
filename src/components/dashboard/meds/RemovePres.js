import { useNotify } from "@/hooks/notify";
import { directus } from "@/lib/api";
import { focusManager, useMutation } from "@tanstack/react-query";
import React, { Fragment, useState } from "react";
import { Modal } from "rsuite";

const RemovePres = ({ pres }) => {
  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!modal);
  };
  const { showMsg } = useNotify();
  const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await directus.items("prescription").deleteOne(id);
      return res;
    },
    onSuccess: () => {
      focusManager.setFocused(true);
      handleModal();
      showMsg("PRESCRIPTION HAS BEEN DELETED !!");
    },
  });
  const handleRemove = () => {
    mutation.mutate(pres.id);
  };
  return (
    <Fragment>
      <button className="btn btn-outline-danger" onClick={handleModal}>
        Remove
      </button>
      <Modal open={modal} backdrop="static">
        <Modal.Header>
          <Modal.Title>REMOVE PRESCRIPTION</Modal.Title>
        </Modal.Header>
        <hr />
        <Modal.Body>
          Do you want to remove {pres?.product?.name},{pres?.meta?.strength}{" "}
          {pres?.dose} {pres?.freq?.name} for {pres?.meta?.days} day(s)
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleModal}>
            Cancel
          </button>
          <button className="btn btn-danger ml-2" onClick={handleRemove}>
            Remove
          </button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default RemovePres;

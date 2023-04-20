import { useNotify } from "@/hooks/notify";
import { directus } from "@/lib/api";
import {
  focusManager,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import React, { Fragment } from "react";
import { useState } from "react";
import { Input, Label } from "reactstrap";
import { Modal } from "rsuite";

const ServeDrug = ({ pres }) => {
  const { showError, showMsg } = useNotify();
  const [modal, setModal] = useState(false);
  const [qty, setQty] = useState(pres.qty);
  const handleModal = () => {
    setModal(!modal);
  };

  const mutation = useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await directus.items("prescription").updateOne(id, payload);
      return res;
    },
    onSuccess: (data) => {
      //   queryClient.resetQueries(["reportDetail", reportId]);
      focusManager.setFocused(true);
      handleModal();
      if (pres?.status !== "published") {
        setQty("");
      }

      showMsg("PRESCRIPTION UPDATED !!");
    },
    onError: (err) => {
      showError(err);
    },
  });

  const handleSubmit = () => {
    let payload = {
      qty,
      status: "published",
    };

    mutation.mutate({ id: pres.id, payload });
  };
  return (
    <Fragment>
      {pres?.status == "published" ? (
        <button className="btn btn-secondary" onClick={handleModal}>
          Update
        </button>
      ) : (
        <button className="btn btn-primary" onClick={handleModal}>
          Serve
        </button>
      )}
      {/* <button className="btn btn-primary" onClick={handleModal}>
        Serve Drug
      </button> */}
      <Modal open={modal} size="xs">
        <Modal.Header>
          <Modal.Title>Serve Drug</Modal.Title>
        </Modal.Header>
        <hr />
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              {/* {JSON.stringify(pres.status)} */}
              <div className="col">
                <h6>
                  {pres?.product?.name},{pres?.meta?.strength} {pres?.dose}{" "}
                  {pres?.freq?.name} for {pres?.meta?.days} day(s)
                </h6>
              </div>
            </div>
            <Label className="text-dark">Quantity</Label>
            <Input
              type="number"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </div>
          <div className="container-fluid mt-2">
            <Label>Notes</Label>
            <Input type="textarea" value={pres?.notes} disabled />
          </div>
        </Modal.Body>
        <hr />
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleModal}>
            Cancel
          </button>
          <button className="btn btn-primary ml-2" onClick={handleSubmit}>
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default ServeDrug;

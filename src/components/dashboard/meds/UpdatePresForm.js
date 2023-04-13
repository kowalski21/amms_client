import React, { Fragment, useState } from "react";
import { DatePicker, Modal } from "rsuite";
// import FormLoader from "../reports/containers/FormLoader";
import { FormGroup, Input, Label } from "reactstrap";
import SelectProduct from "./SelectProduct";
import SelectFreq from "./SelectFreq";
import { DateTime } from "luxon";
import {
  focusManager,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { directus } from "@/lib/api";
import { useNotify } from "@/hooks/notify";

const UpdatePresForm = ({ pres }) => {
  const [drug, setDrug] = useState(pres?.product?.id);
  const [frequency, setFrequency] = useState(pres?.freq?.id);
  const [strength, setStrength] = useState(pres?.meta?.strength);
  const [from, setFrom] = useState(
    pres?.start_date ? DateTime.fromISO(pres?.start_date).toJSDate() : null
  );
  const [to, setTo] = useState(
    pres?.end_date ? DateTime.fromISO(pres?.end_date).toJSDate() : null
  );
  const [days, setDays] = useState(pres?.meta?.days);
  const [qty, setQty] = useState(pres?.meta?.quantity);
  const [notes, setNotes] = useState(pres?.notes);
  const [dose, setDose] = useState(pres?.dose);
  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!modal);
  };
  const handleFrequency = (val) => {
    setFrequency(val);
  };

  const handleTo = (val) => {
    setTo(val);
  };
  const handleFrom = (val) => {
    setFrom(val);
  };

  const handleQty = (e) => {
    setQty(e.target.value);
  };
  const handleDrug = (val) => {
    setDrug(val);
  };

  const handleDays = (days) => {
    let startDate = DateTime.now();
    let endDate = null;
    if (days) {
      endDate = startDate.plus({ days: days });
      setFrom(startDate.toJSDate());
      setTo(endDate.toJSDate());
    } else {
      setFrom(null);
      setTo(null);
    }
    setDays(days);
  };
  const { showError, showMsg } = useNotify();
  const queryClient = useQueryClient();

  const handleSubmit = () => {
    let payload = {
      meta: {
        days,
        quantity: qty,
        strength: strength,
        dose: dose,
      },
      freq: frequency,
      dose,
      start_date: from,
      end_date: to,
      product: drug,
      notes,
    };
    if (frequency) {
      payload["freq"] = frequency;
    } else {
      delete payload["freq"];
    }
    // console.log(payload);
    mutation.mutate({ id: pres.id, payload });
  };
  const mutation = useMutation({
    mutationFn: async ({ id, payload }) => {
      //   const res = await directus.items("prescription").createOne(payload);
      const res = await directus.items("prescription").updateOne(id, payload);
      return res;
    },
    onSuccess: (data) => {
      //   queryClient.resetQueries(["reportDetail", reportId]);
      focusManager.setFocused(true);
      handleModal();
      showMsg("PRESCRIPTION UPDATED !!");
    },
    onError: (err) => {
      showError(err);
    },
  });
  return (
    <Fragment>
      <button className="btn btn-primary " onClick={handleModal}>
        Update
      </button>
      <Modal backdrop="static" open={modal} onClose={handleModal}>
        <Modal.Header>
          <Modal.Title>Update Prescription</Modal.Title>
        </Modal.Header>
        <hr />
        <Modal.Body>
          <div className="container-fluid">
            <div className="row mb-3">
              <div className="col">
                <Label>Drug</Label>
                <SelectProduct initial={drug} onChangeHandler={handleDrug} />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                <FormGroup>
                  <Label>Frequency</Label>
                  <SelectFreq
                    inital={frequency}
                    onChangeHandler={handleFrequency}
                  />
                </FormGroup>
              </div>
              <div className="col-md-4">
                <FormGroup>
                  <Label>Dose</Label>
                  <Input
                    value={dose}
                    onChange={(e) => setDose(e.target.value)}
                  />
                </FormGroup>
              </div>
              <div className="col-md-4">
                <Label>Strength</Label>
                <Input
                  value={strength}
                  onChange={(e) => setStrength(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <Label>Days</Label>
                <Input
                  type="number"
                  value={days}
                  onChange={(e) => handleDays(e.target.value)}
                />
              </div>
              <div className="col">
                <Label>Quantity</Label>
                <Input type="number" value={qty} onChange={handleQty} />
              </div>
            </div>
            {from && to && (
              <div className="row mb-3">
                <div className="col">
                  <FormGroup>
                    <Label>Start Date</Label>
                    <DatePicker block value={from} onChange={handleFrom} />
                  </FormGroup>
                </div>
                <div className="col">
                  <FormGroup>
                    <Label>End Date</Label>
                    <DatePicker block value={to} onChange={handleTo} />
                  </FormGroup>
                </div>
              </div>
            )}
            <div className="row mb-3">
              <div className="col">
                <FormGroup>
                  <Label>Notes (optional)</Label>
                  <Input
                    type="textarea"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </FormGroup>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary mr-2" onClick={handleModal}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default UpdatePresForm;

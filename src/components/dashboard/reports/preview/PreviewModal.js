import { useReport } from "@/hooks/report";
import React, { Fragment, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
} from "reactstrap";
// import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import PreviewPatientInfo from "./PreviewPatientInfo";
import PreviewVitalnfo from "./PreviewVitalnfo";
const PreviewModal = ({ report, id }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const { data, isLoading } = useReport({
    id: report,
    queryKey: ["reportDetail", report],
    query: {
      fields: "*,client.*,area.id,area.name,area.short_name",
    },
  });
  return (
    <Fragment>
      <button className="btn btn-info btn-dark" onClick={toggle}>
        Preview Report
      </button>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader>
          <ModalTitle>REPORT PREVIEW</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <h4 className="h6 text-uppercase">Patient Information</h4>
          {data && <PreviewPatientInfo report={data} />}
          <hr />
          <h4 className="h6 text-uppercase">Patient Vitals</h4>
          {data && <PreviewVitalnfo report={data} />}
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default PreviewModal;

import React from "react";
import { Modal, ModalHeader } from "reactstrap";

export const DbErrorModal = (props) => {
  return (
    <div>
      {console.log("I am heree")}
      <Modal size="lg" isOpen={props.dbModal}>
        <ModalHeader>
          Our servers are sleeping, please refresh page again after some time..!
        </ModalHeader>
      </Modal>
    </div>
  );
};

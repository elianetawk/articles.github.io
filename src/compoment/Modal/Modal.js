import React from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
 

const modal = (props) => {
  return (
    <Modal
      style={
        !props.isLoading
          ? {}
          : {
              "--bs-modal-width": "120px",
            }
      }
      show={props.show}
      onHide={props.closed}
    >
      {!props.isLoading && (
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body>{props.label}</Modal.Body>
      {!props.isLoading && (
        <Modal.Footer>
          <Button variant="secondary" onClick={props.closed}>
            Close
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default modal;

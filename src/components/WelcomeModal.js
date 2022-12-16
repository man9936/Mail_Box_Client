import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function WelcomeModal() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const loggedUserEmail = JSON.parse(localStorage.getItem("idToken")).email;

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Hello {loggedUserEmail}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Welcome to Mail Box Client App</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

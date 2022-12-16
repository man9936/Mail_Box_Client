import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ListGroup, Badge, Button } from "react-bootstrap";

import classes from "./MailData.module.css";
import { replaceMail } from "../store/mail-actions";
import { deleteMail } from "../store/mail-actions";

const MailData = (props) => {
  const loggedUserEmail = JSON.parse(localStorage.getItem("idToken")).email;
  const emailUrl = loggedUserEmail.replace("@", "").replace(".", "");
  const [showBody, setShowBody] = useState(false);
  const dispatch = useDispatch();
  const status = props.mail.read ? "seen" : "unseen";
  const receivedStatus = props.toOrFrom == "From";
  let x;
  if (props.mail.read && props.toOrFrom == "From : ") {
    x = "seen";
  } else if (!props.mail.read) {
    x = "unseen";
  } else if (props.toOrFrom == "To : ") {
    x = "sent";
  }

  // checking if mail is read or not
  const readMailHandler = async () => {
    setShowBody((preState) => !preState);
    if (!props.mail.read) {
      const email = props.mail.to.replace("@", "").replace(".", "");
      try {
        const response = await fetch(
          `https://auth-react-b1ea2-default-rtdb.firebaseio.com/${email}/${props.mail.id}.json`,
          {
            method: "PUT",
            body: JSON.stringify({ ...props.mail, read: true }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw data.error;
        } else {
          dispatch(replaceMail(emailUrl, loggedUserEmail));
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  // deleting mail
  const removeMailHandler = () => {
    dispatch(deleteMail(props.mail));
  };

  return (
    <ListGroup as="ol" numbered>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
        onClick={readMailHandler}
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">
            {props.toOrFrom}:{props.mailId}
          </div>
          {props.mail.title}
        </div>

        <Badge bg="primary" pill>
          {x}
        </Badge>

        <Badge
          style={{ cursor: "pointer" }}
          className="bg-danger"
          onClick={removeMailHandler}
        >
          <small> Delete</small>
        </Badge>

        <div className={showBody ? classes.body : classes.notBody}>
          <div>{props.mail.text}</div>
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default MailData;

import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Button, Card, Form } from "react-bootstrap";

import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import classes from "./Compose.module.css";
import { addMail } from "../store/mail-actions";

const Compose = () => {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const titleRef = useRef();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
  };

  const clearInputFields = () => {
    emailRef.current.value = "";
    titleRef.current.value = "";
    setEditorState(null);
  };

  const sendMailHandler = async (event) => {
    event.preventDefault();
    const mailData = {
      from: JSON.parse(localStorage.getItem("idToken")).email,
      to: emailRef.current.value,
      title: titleRef.current.value,
      text: editorState.getCurrentContent().getPlainText()
    };
    dispatch(addMail(mailData, clearInputFields));
  };

  return (
    <>
      {/* <form className={classes.form} onSubmit={sendMailHandler}>
      <div className={classes.to}>
        <label>To : </label>
        <input type='email' ref={emailRef} required />
      </div>
      <div className={classes.title}>
        <label>Title : </label>
        <input type='text' ref={titleRef} required />
      </div>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName={classes['wrapper-class']}
        editorClassName={classes['editor-class']}
        toolbarClassName={classes['toolbar-class']}
      />
      <div className={classes.button}>
        <button type='submit'>Send</button>
      </div>
    </form> */}

      <Container>
        <Card
          className="shadow-lg"
          style={{ margin: "20px 20%", width: "80%", height: "60%" }}
        >
          <Card.Header className="bg-secondary">
            <Form>
              <input
                placeholder="To"
                ref={emailRef}
                style={{ width: "100%", marginBottom: "10px" }}
              ></input>
              <input
                placeholder="Subject"
                ref={titleRef}
                style={{ width: "100%", marginBottom: "10px" }}
              ></input>
            </Form>
          </Card.Header>
          <Card.Body>
            <Editor
              editorState={editorState}
              onEditorStateChange={handleEditorChange}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
            ></Editor>
          </Card.Body>
          <Card.Footer className=" bg-secondary">
            <Button
              variant="danger"
              style={{ marginLeft: "45%", cursor: "pointer" }}
              type="submit"
              onClick={sendMailHandler}
            >
              Send
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    </>
  );
};

export default Compose;

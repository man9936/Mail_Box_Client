import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import classes from "./Login.module.css";
import { authActions } from "../store/auth-slice";
import { mailActions } from "../store/mail-slice";

import { Button, Card } from "react-bootstrap";
import { Form, Container } from "react-bootstrap";

const Login = () => {
  const [hasAccount, setHasAccount] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const hasAccountHandler = () => {
    setHasAccount((preState) => !preState);
  };

  let url;
  if (hasAccount) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC6fDnhYOxjGbDuLGTyrDReR3nx4F7TUD0";
  } else {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC6fDnhYOxjGbDuLGTyrDReR3nx4F7TUD0";
  }

  const loginFormHandler = async (event) => {
    event.preventDefault();

    if (
      !hasAccount &&
      passwordRef.current.value !== confirmPasswordRef.current.value
    ) {
      alert("Password and Confirmed password are different");
      return;
    }

    try {
      const respense = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
          returnSecureToken: true
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await respense.json();

      if (respense.ok) {
        localStorage.setItem("idToken", JSON.stringify(data));
        dispatch(authActions.login());
        dispatch(mailActions.firstTime(true));
        navigate("/home");
      } else {
        throw data.error;
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      {/* <div className={classes["main-form"]}>
        <form className={classes.form} onSubmit={loginFormHandler}>
          <div className={classes.title}>
            {hasAccount ? "Login" : "Sign Up"}
          </div>
          <input type="email" placeholder="Email" ref={emailRef} required />
          <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            required
          />
          {!hasAccount && (
            <input
              type="password"
              placeholder="Confirm Password"
              ref={confirmPasswordRef}
              required
            />
          )}
          <div className={classes.button}>
            <button type="submit">{hasAccount ? "Login" : "Sign Up"}</button>
          </div>
        </form>
        <div onClick={hasAccountHandler} className={classes.hasAccount}>
          {hasAccount
            ? "Don`t have an account? Sign Up"
            : "Have an account? Sign In"}
        </div>
      </div> */}

      <Container className="mt-5" style={{ width: "400px" }}>
        <Card className="shadow-lg" style={{ marginTop: "100px" }}>
          <Card.Header style={{ backgroundColor: "lightseagreen" }}>
            <h4>{hasAccount ? "Login" : "Sign Up"}</h4>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={loginFormHandler}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  ref={emailRef}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={passwordRef}
                  required
                />
              </Form.Group>
              {!hasAccount && (
                <Form.Group className="mb-3" controlId="formConfirmPassword">
                  <Form.Control
                    type="confirmpassword"
                    placeholder="Confirm Password"
                    ref={confirmPasswordRef}
                    required
                  />
                </Form.Group>
              )}
              <Form.Group>
                <Button
                  style={{
                    backgroundColor: "lightseagreen",
                    marginLeft: "120px"
                  }}
                  type="submit"
                >
                  {hasAccount ? "Login" : "Sign Up"}
                </Button>
              </Form.Group>
              {/* {isSendingRequest && (
               <Alert style={{ textAlign: "center" }}>Sending Request</Alert>
             )} */}
              <Card.Footer
                className="mt-3"
                style={{ textAlign: "center", cursor: "pointer" }}
              >
                <div onClick={hasAccountHandler}>
                  {hasAccount
                    ? "Don`t have an account? Sign Up"
                    : "Have an account? Sign In"}
                </div>
              </Card.Footer>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Login;

import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";

import classes from "./MainNavigation.module.css";
import { authActions } from "../store/auth-slice";
import { showActions } from "../store/show-slice";

const MainNavigation = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const authHandler = () => {
    if (isLoggedIn) {
      dispatch(authActions.logout());
      dispatch(showActions.compose());
    }
  };

  return (
    <>
      {/* <div className={classes.mainNav}>
        <nav>
          <ul>
            <li className={classes.welcome}>
              <NavLink
                to="/home"
                className={({ isActive }) => (isActive ? classes.active : "")}
              >
                <i className="ri-mail-line"></i>
                Mail Box
              </NavLink>
            </li>
            <li className={classes.auth}>
              <NavLink
                onClick={authHandler}
                to="/login"
                className={({ isActive }) => (isActive ? classes.active : "")}
              >
                {!isLoggedIn ? "Login" : "Logout"}
                {!isLoggedIn ? (
                  <i className="ri-login-circle-line"></i>
                ) : (
                  <i className="ri-logout-circle-line"></i>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div> */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand style={{ marginLeft: "30%" }}>
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              <i className="ri-mail-line"></i>
              Mail Box
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-center">
            <Navbar.Text>
              <NavLink
                onClick={authHandler}
                to="/login"
                className={({ isActive }) => (isActive ? classes.active : "")}
              >
                {!isLoggedIn ? "Login" : "Logout"}
                {!isLoggedIn ? (
                  <i className="ri-login-circle-line"></i>
                ) : (
                  <i className="ri-logout-circle-line"></i>
                )}
              </NavLink>
            </Navbar.Text>

            {/* <Navbar.Text>
              Signed in as:{"  "}
              <a style={{ color: "orange" }} href="#login"></a>
            </Navbar.Text> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MainNavigation;

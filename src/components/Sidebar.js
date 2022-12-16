import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Badge from "react-bootstrap/Badge";

import classes from "./Sidebar.module.css";
import { showActions } from "../store/show-slice";

import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import { SelectionState } from "draft-js";

const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const state = useSelector((state) => state.show);
  const unreadMessageCount = useSelector(
    (state) => state.mail.unreadMessageCount
  );
  const dispatch = useDispatch();

  const composeHandler = () => {
    dispatch(showActions.compose());
  };

  const sentHandler = () => {
    dispatch(showActions.sent());
  };

  const receivedHandler = () => {
    dispatch(showActions.received());
  };

  const visibilityHandler = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <SideNav>
      <SideNav.Toggle onClick={visibilityHandler} />
      <SideNav.Nav defaultSelected="none">
        <NavItem eventKey="compose" onClick={composeHandler}>
          <NavIcon>
            <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>Compose Mail</NavText>
        </NavItem>
        <NavItem eventKey="inbox" onClick={receivedHandler}>
          <NavIcon>
            <i
              className="fa fa-fw fa-line-chart"
              style={{ fontSize: "1.75em" }}
            />
          </NavIcon>
          <NavText>
            Inbox
            <Badge bg="secondary">
              {"  "}
              {unreadMessageCount}: unread
            </Badge>
            {/* <span></span> */}
          </NavText>
        </NavItem>
        <NavItem eventKey="Sent" onClick={sentHandler}>
          <NavIcon>
            <i
              className="fa fa-fw fa-line-chart"
              style={{ fontSize: "1.75em" }}
            />
          </NavIcon>
          <NavText>Sent Mails</NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
};

export default Sidebar;

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { create } from "react-test-renderer";
import SideBar from "../components/sideBar";
import { shallow, mount } from "enzyme";
import { fireEvent, render } from "@testing-library/react";
import * as Constants from "../../constants";
import { Link } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import { Typography, Box } from "@material-ui/core";
import { MemoryRouter } from "react-router-dom";

describe("sidebar component", () => {
  const logoutUser = jest.fn();
  test("Matches the snapshot", () => {
    const sidebar = create(
      <Router>
        <SideBar />
      </Router>
    );
    expect(sidebar.toJSON()).toMatchSnapshot();
  });
});

import React, { Component } from "react";
import { shallow } from "enzyme";
import SideBar from "../components/sideBar";
import LandingPage from "../views/landingPage";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";

describe("Landing page component", () => {
  it("should have Login content in the sidebar", () => {
    const { getByTestId } = render(
      <Router>
        <LandingPage>
          <SideBar />
        </LandingPage>
      </Router>
    );
    expect(getByTestId("login")).toBeInTheDocument();
  });
  it("should have Maps content in the sidebar", () => {
    const { getByTestId } = render(
      <Router>
        <LandingPage>
          <SideBar />
        </LandingPage>
      </Router>
    );
    expect(getByTestId("maps")).toBeInTheDocument();
  });
});

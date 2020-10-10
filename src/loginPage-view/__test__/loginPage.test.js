import React from "react";
import { shallow } from "enzyme";
import LoginPage from "../views/loginPage";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SideBar from "../../landingPage-view/components/sideBar";

describe("Login page component", () => {
  const wrapper = shallow(<LoginPage />);
  it("should have Login Heading", () => {
    const content = wrapper.find({ "data-testid": "login" }).text();
    expect(content).toBe("Login");
  });
  it("background image to be checked", () => {
    const { getByTestId } = render(
      <Router>
        <LoginPage />
      </Router>
    );
    expect(getByTestId("bgImage")).toBeInTheDocument();
  });
  it("should have Maps content in the sidebar", () => {
    const { getByTestId } = render(
      <Router>
        <LoginPage>
          <SideBar />
        </LoginPage>
      </Router>
    );
    expect(getByTestId("maps")).toBeInTheDocument();
  });
});

import React from "react";
import { shallow } from "enzyme";
import LoginForm from "../components/loginForm";
import * as Constants from "../../constants";
import { render, fireEvent, act, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import fetchMock from "fetch-mock";
import { BrowserRouter as Router, MemoryRouter } from "react-router-dom";
import { create } from "react-test-renderer";
import { createMemoryHistory } from "history";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";

describe("Login Form component", () => {
  let userProps = {
    label: "Username",
    placeholder: "Enter email",
    username: "admin",
    onChange: jest.fn(),
  };
  let passwordProps = {
    label: "Password",
    placeholder: "Enter password",
    password: "zemoso@123",
    onChange: jest.fn(),
  };
  let container;
  const wrapper = shallow(<LoginForm />);
  beforeEach(() => {
    container = document.createElement("LoginForm");
    document.body.appendChild(container);
  });
  test("Matches the snapshot", () => {
    const loginForm = create(
      <Router>
        <LoginForm />
      </Router>
    );
    expect(loginForm.toJSON()).toMatchSnapshot();
  });
  it("label should be Username", () => {
    const content = wrapper.find({ "data-testid": "usernameLabel" }).text();
    expect(content).toBe("Username");
  });
  it("should have password label", () => {
    const content = wrapper.find({ "data-testid": "passwordLabel" }).text();
    expect(content).toBe("Password");
  });
  it("should have Sign in content on the button", () => {
    const content = wrapper.find({ "data-testid": "signIn" }).text();
    expect(content).toBe("Sign in");
  });
  test("handle click event should work", async () => {
    const { getByTestId } = render(
      <Router>
        <LoginForm />
      </Router>
    );
    fireEvent.click(getByTestId("signIn"));
    fetchMock.mock("http://localhost:3001/login", 200);
    const response = await fetch("http://localhost:3001/login");
    expect(response.ok).toBeTruthy;
  });
  test("error message must be displayed for wrong inputs", async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      var p = new Promise((resolve, reject) => {
        resolve({
          ok: false,
        });
      });
      return p;
    });
    const { getByTestId, getByRole, getByText } = render(
      <Router>
        <LoginForm />
      </Router>
    );
    fireEvent.change(getByTestId("username"), {
      target: { value: "admin" },
    });
    fireEvent.change(getByTestId("password"), {
      target: { value: "zemoso" },
    });
    await fireEvent.click(getByRole("button"));
    expect(getByTestId("error")).toBeInTheDocument();
    expect(getByText("invalid credentials")).toBeInTheDocument();
  });
  test("should login on entering correct credentials", async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      var x = new Promise((resolve, reject) => {
        resolve({
          ok: true,
          json: function () {
            return { access_token: "fake_access_token" };
          },
        });
      });
      return x;
    });
    const { getByTestId, getByRole } = render(
      <Router>
        <LoginForm />
      </Router>
    );
    fireEvent.change(getByTestId("username"), {
      target: { value: "admin" },
    });
    fireEvent.change(getByTestId("password"), {
      target: { value: "zemoso@123" },
    });
    await act(() => fireEvent.click(getByRole("button")));
  });
});

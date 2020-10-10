import React from "react";
import LocationsListPage from "../views/locationsListPage";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter as Router, MemoryRouter } from "react-router-dom";
import { getAllByTestId, render } from "@testing-library/react";
import fetchMock from "fetch-mock";
import { createStore } from "redux";
import { create } from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

var value = {
  "fake-access-token": true,
  token: {
    access_token: "fake_access_token",
  },
};

jest.mock("mapbox-gl", () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn(),
  })),
  NavigationControl: jest.fn(),
  Marker: jest.fn(() => ({
    setLngLat: jest.fn(() => ({
      addTo: jest.fn(),
    })),
  })),
}));

describe("locations list page", () => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn().mockReturnValue(JSON.stringify(value)),
    },
  });
  const store = createStore(() => ({
    locations: [
      { id: 1, lat: 40.712776, lng: -74.005974 },
      { id: 2, lat: 42.360081, lng: -71.058884 },
    ],
  }));

  const wrapper = shallow(
    <Provider store={store}>
      <Router>
        <LocationsListPage />
      </Router>
    </Provider>
  );
  test("Matches the snapshot", () => {
    const locationOnMap = create(
      <Router>
        <Provider store={store}>
          <LocationsListPage />
        </Provider>
      </Router>
    );
    expect(locationOnMap.toJSON()).toMatchSnapshot();
  });
  it("should have locations list page", () => {
    expect(wrapper.exists()).toBe(true);
  });
  test("should have sidebar", () => {
    const { getByTestId } = render(
      <Router>
        <Provider store={store}>
          <LocationsListPage />
        </Provider>
      </Router>
    );
    expect(getByTestId("sidebar")).toBeInTheDocument();
  });

  it("should have addLocation button", () => {
    const button = wrapper.find({ "data-testid": "button" });
    expect(button).toHaveLength(0);
  });
  it("should have arrowUpwardIcon", () => {
    const arrowUpIcon = wrapper.find({ "data-testid": "arrowUp" });
    expect(arrowUpIcon).toHaveLength(0);
  });

  it("should have card", () => {
    const card = wrapper.find({ "data-testid": "card" });
    expect(card).toHaveLength(0);
  });
  it("card should have content", () => {});
  test("listing of locations call should work", async () => {
    fetchMock.mock("http://localhost:3001/locations", 200);
    const res = await fetch("http://localhost:3001/locations");
    expect(res.ok).toBeTruthy;
  });
});

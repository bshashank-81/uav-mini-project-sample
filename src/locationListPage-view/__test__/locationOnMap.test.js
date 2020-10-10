import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import LocationOnMap from "../views/locationOnMap";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { createStore } from "redux";
import { create } from "react-test-renderer";
import { render } from "@testing-library/react";

var value = {
  "fake-access-token": true,
  token: {
    access_token: "fake_access_token",
  },
};

jest.mock("mapbox-gl/dist/mapbox-gl", () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn().mockImplementation(() => console.log("add control")),
    on: jest.fn(),
    resize: jest.fn(),
  })),
  NavigationControl: jest.fn(),
  MapboxGeocoder: jest.fn(),
  Marker: jest.fn(() => ({
    setLngLat: jest.fn(() => ({
      addTo: jest.fn(),
    })),
  })),
}));

describe("locationOnMap page", () => {
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
    <Router>
      <Provider store={store}>
        <LocationOnMap isAddNewLocation="true" showLocationOnMap="true" />
      </Provider>
    </Router>
  );
  test("matches the snapshot", () => {
    const locationOnMapView = create(
      <Router>
        <Provider store={store}>
          <LocationOnMap />
        </Provider>
      </Router>
    );
    expect(locationOnMapView.toJSON()).toMatchSnapshot();
  });
  it("should have locationOnMap page", () => {
    expect(wrapper.exists()).toBe(true);
  });
  it("should have sidebar", () => {
    const sidebar = wrapper.find({ "data-testid": "sidebar" });
    expect(sidebar.exists()).toBe;
  });
  it("should have map", () => {
    const map = wrapper.find({ "data-testid": "map" });
    expect(map.exists()).toBe;
  });
  test("map", () => {
    const { getByTestId } = render(
      <Router>
        <Provider store={store}>
          <LocationOnMap />
        </Provider>
      </Router>
    );
    expect(getByTestId("map")).toBeInTheDocument();
  });
});

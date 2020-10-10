import React from "react";
import AddLocation from "../views/addLocation";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import { create } from "react-test-renderer";

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

describe("addLocation page", () => {
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
        <AddLocation />
      </Provider>
    </Router>
  );
  test("Matches the snapshot", () => {
    const addLocationView = create(
      <Router>
        <Provider store={store}>
          <AddLocation />
        </Provider>
      </Router>
    );
    expect(addLocationView.toJSON()).toMatchSnapshot();
  });
  it("should have addLocation page", () => {
    expect(wrapper.exists()).toBe(true);
  });
  it("should have sidebar", () => {
    const sideBar = wrapper.find({ "data-testid": "sidebar" });
    expect(sideBar.exists()).toBe;
  });
  it("should have map", () => {
    const map = wrapper.find({ "data-testid": "map" });
    expect(map.exists()).toBe;
  });
});

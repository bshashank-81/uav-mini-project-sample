import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Map from "../components/map";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { render, fireEvent, act } from "@testing-library/react";
import PublicIcon from "@material-ui/icons/Public";
import { createStore } from "redux";
import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("mapbox-gl", () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
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

var value = {
  fake_access_token: true,
  token: {
    access_token: "fake_access_token",
  },
};

const handleViewMode = jest.fn(() => ({
  Map: jest.fn(() => ({
    setStyle: jest.fn(),
  })),
}));

describe("Map component", () => {
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

  test("Matches the snapshot", () => {
    const maps = create(
      <Router>
        <Provider store={store}>
          <Map />
        </Provider>
      </Router>
    );
    expect(maps.toJSON()).toMatchSnapshot();
  });

  test("Map component should be there", () => {
    const { getByTestId } = render(
      <Router>
        <Provider store={store}>
          <Map />
        </Provider>
      </Router>
    );
    expect(getByTestId("map")).toBeInTheDocument();
  });

  test("public icon should be there", () => {
    const { getByTestId } = render(
      <Router>
        <Provider store={store}>
          <Map>
            <PublicIcon id="publicIcon" onClick={handleViewMode} />
          </Map>
        </Provider>
      </Router>
    );
    expect(getByTestId("publicIcon")).toBeInTheDocument();
    fireEvent.click(getByTestId("publicIcon"));
  });
});

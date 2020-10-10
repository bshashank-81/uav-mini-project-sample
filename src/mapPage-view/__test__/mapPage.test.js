import React, { useEffect } from "react";
import { shallow } from "enzyme";
import MapPage from "../views/mapPage";
import SideBar from "../../landingPage-view/components/sideBar";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import store from "../../redux/store";
import { Provider } from "react-redux";
import { create } from "react-test-renderer";

// describe("MapPage Component", () => {
//   let useEffect;
//   const mockUseEffect = () => {
//     useEffect.mockImplementationOnce((f) => f());
//   };
//   useEffect = jest.spyOn(React, "useEffect");
//   mockUseEffect();
//   const wrapper = shallow(<MapPage />);
//   //   beforeEach(() => {
//   //     const map = new mapboxgl.Map({
//   //       container: mapContainer.current,
//   //       style: "mapbox://styles/mapbox/streets-v11",
//   //       center: [-1.327195757025379, 17.478961998511124],
//   //       // center: [locationList.locations.lng, locationList.locations.lat],
//   //       zoom: 4,
//   //     });
//   //   });
//   it("should render the map page component", () => {
//     expect(wrapper.exists()).toBe(true);
//   });
//   // it("should have Login content in the sidebar", () => {
//   //   const { getByTestId } = render(
//   //     <Router>
//   //       <MapPage>
//   //         <SideBar />
//   //       </MapPage>
//   //     </Router>
//   //   );
//   //   expect(getByTestId("login")).toBeInTheDocument();
//   // });
// });

const wrapper = shallow(
  <Provider store={store}>
    <MapPage />
  </Provider>
);

describe("MapPage view", () => {
  it("Map page should exist", () => {
    expect(wrapper.exists()).toBe(true);
  });
});

jest.mock("mapbox-gl", () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn().mockImplementation(() => console.log("add control")),
    on: jest.fn(),
    resize: jest.fn(),
  })),
  NavigationControl: jest.fn(),
  MapboxGeocoder: jest.fn(),
}));

describe("MapPage Component", () => {
  it("matches snapshot", () => {
    const map = create(
      <Router>
        <Provider store={store}>
          <MapPage />
        </Provider>
      </Router>
    );
    expect(map.toJSON()).toMatchSnapshot();
  });
  it("should contain sidebar", () => {
    const sidebar = wrapper.find({ "data-testid": "sidebar" });
    expect(sidebar.exists()).toBe;
  });
});

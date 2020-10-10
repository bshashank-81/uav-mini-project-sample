import React from "react";
import * as actions from "../actions/listAction";
import * as types from "../actions/actionTypes";

describe("actions", () => {
  it("should create an action to add location", () => {
    const id = 1;
    const lat = 0;
    const lng = 0;
    const expectedAction = {
      type: types.ADD_LOCATION,
      id: id,
      lat: lat,
      lng: lng,
    };
    expect(actions.addLocation(id, lat, lng)).toEqual(expectedAction);
  });
  it("should create an action to get location", () => {
    const id = 1;
    const lat = 0;
    const lng = 0;
    const expectedAction = {
      type: types.GET_LOCATION,
      id,
      lat,
      lng,
    };
    expect(actions.getLocation(id, lat, lng)).toEqual(expectedAction);
  });
});

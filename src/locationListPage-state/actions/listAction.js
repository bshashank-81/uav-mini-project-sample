import * as actionTypes from "./actionTypes";

export const addLocation = (id, lat, lng) => {
  return {
    type: actionTypes.ADD_LOCATION,
    id: id,
    lat: lat,
    lng: lng,
  };
};

export const getLocation = (id, lat, lng) => {
  return {
    type: actionTypes.GET_LOCATION,
    id: id,
    lat: lat,
    lng: lng,
  };
};

import * as actionTypes from "./actionTypes";

export const addLocation = (id, lat, lng) => {
  return {
    type: actionTypes.ADD_LOCATION,
    id: id,
    lat: lat,
    lng: lng,
  };
};

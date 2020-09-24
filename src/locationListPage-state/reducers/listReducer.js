import * as actionTypes from "../actions/actionTypes";

const listReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_LOCATION:
      return [...state, { id: action.id, lat: action.lat, lng: action.lng }];
    case actionTypes.GET_LOCATION:
      return [...state, { id: action.id, lat: action.lat, lng: action.lng }];
    default:
      return state;
  }
};

export default listReducer;

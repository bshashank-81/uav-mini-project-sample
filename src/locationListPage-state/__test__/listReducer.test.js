import listReducer from "../reducers/listReducer";
import * as types from "../actions/actionTypes";

describe("list reducer", () => {
  it("should return the initial state", () => {
    expect(listReducer(undefined, {})).toEqual([]);
  });
  it("should handle ADD_LOCATION", () => {
    expect(
      listReducer([], {
        type: types.ADD_LOCATION,
        id: 1,
      })
    ).toEqual([
      {
        id: 1,
      },
    ]);
  });
  it("should handle ADD_LOCATION", () => {
    expect(
      listReducer([], {
        type: types.GET_LOCATION,
        id: 1,
      })
    ).toEqual([
      {
        id: 1,
      },
    ]);
  });
});

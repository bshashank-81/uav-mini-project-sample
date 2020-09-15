import { combineReducers, createStore, compose } from "redux";
import listReducer from "../locationListPage-state/reducers/listReducer";

const reducer = combineReducers({
  locations: listReducer,
});

const store = createStore(
  reducer,
  process.env.NODE_ENV !== "production" &&
    typeof window === "object" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION__({})
    : compose
);

export default store;

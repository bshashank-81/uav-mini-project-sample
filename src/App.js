import React from "react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import Login from "./loginPage-view/views/loginPage";
import LandingPage from "./landingPage-view/views/landingPage";
import MapPage from "./mapPage-view/views/mapPage";
import LocationsListPage from "./locationListPage-view/views/locationsListPage";
import AddLocation from "./addLocationPage-view/views/addLocation";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./utils/theme/theme";
import { Provider } from "react-redux";
import store from "./redux/store";
import LocationOnMap from "./locationListPage-view/views/locationOnMap";
import PrivateRoute from "./reusable-components/privateRoute";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Router>
            <Route path="/login" component={Login} />
            <Route exact path="/" component={LandingPage} />
            <Route path="/maps" component={MapPage} />
            <PrivateRoute path="/locations" component={LocationsListPage} />
            <PrivateRoute path="/locations/new" component={AddLocation} />
            <PrivateRoute
              path="/locations/:(\d+)"
              component={withRouter(LocationOnMap)}
            />
          </Router>
        </div>
      </Provider>
    </ThemeProvider>
  );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./loginPage-view/components/loginPage";
import LandingPage from "./landingPage-view/components/landingPage";
import MapPage from "./mapPage-view/components/mapPage";
import HomePage from "./homePage-view/components/homePage";
import LocationPage from "./locationListPage-view/components/locationPage";
import AddLocation from "./addLocationPage-view/components/addLocation";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./utils/theme/theme";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Router>
            <Route path="/login" component={Login} />
            <Route exact path="/" component={LandingPage} />
            <Route path="/maps" component={MapPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/locations" component={LocationPage} />
            <Route path="/locations/new" component={AddLocation} />
          </Router>
        </div>
      </Provider>
    </ThemeProvider>
  );
};

export default App;

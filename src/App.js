import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./loginPage-view/components/loginPage";
import LandingPage from "./landingPage-view/components/navBar";
import Map from "./mapPage-view/components/map";

const App = () => {
  return (
    <Router>
      <Route path="/login" component={Login} />
      <Route exact path="/" component={LandingPage} />
      <Route path="/maps" component={Map} />
    </Router>
  );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./loginPage-view/components/loginPage";
import LandingPage from "./landingPage-view/components/primaryAppBar";

const App = () => {
  return (
    <Router>
      <Route path="/login" component={Login} />
      <Route exact path="/" component={LandingPage} />
    </Router>
  );
};

export default App;

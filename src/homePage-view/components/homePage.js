import React from "react";
import Map from "../../mapPage-view/components/map";
import { makeStyles, Typography } from "@material-ui/core";
import SideBar from "../../landingPage-view/components/sideBar";

const HomePage = () => {
  return (
    <div>
      <SideBar />
      <Map />
    </div>
  );
};

export default HomePage;

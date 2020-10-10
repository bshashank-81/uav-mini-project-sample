import React from "react";
import SideBar from "../../landingPage-view/components/sideBar";
import Map from "../../mapPage-view/components/map";

const LocationOnMap = () => {
  return (
    <div>
      <SideBar />
      <Map showLocationOnMap="true" isAddNewLocation="true" />
    </div>
  );
};

export default LocationOnMap;

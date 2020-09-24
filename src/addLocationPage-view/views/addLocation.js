import React from "react";
import SideBar from "../../landingPage-view/components/sideBar";
import Map from "../../mapPage-view/components/map";

const AddLocation = () => {
  return (
    <div>
      <SideBar />
      <Map isAddNewLocation="true" />
    </div>
  );
};

export default AddLocation;

import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
}));

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2hhc2hhbmswOTgiLCJhIjoiY2tldTN2bmtpMGt4ODJybGh5bTgxaWtpdyJ9.YfXby0dj117LY3Hi_zbUUA";

const Map = () => {
  const classes = useStyles();

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
    });
  }, []);

  return (
    <div>
      <div
        ref={(el) => (this.mapContainer = el)}
        className={classes.mapContainer}
      />
    </div>
  );
};

export default Map;

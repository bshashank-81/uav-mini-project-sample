import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "./buttons.css";
// import StylesControl from "mapbox-gl-controls/lib/styles";
import { Hidden, makeStyles } from "@material-ui/core";
import PublicIcon from "@material-ui/icons/Public";

const styles = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: "0",
  bottom: "0",
  left: "0",
  overflow: "hidden",
};

const useStyles = makeStyles((theme) => ({
  mapPage: {
    overflow: "hidden",
  },
  icon: {
    right: "13px",
    bottom: "18%",
    position: "absolute",
    background: "white",
  },
}));

const Map = () => {
  const classes = useStyles();
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
  const [map, setMap] = useState(null);
  const [flag, setFlag] = useState(true);
  const mapContainer = useRef(null);

  useEffect(() => {
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        //   style: "mapbox://styles/mapbox/satellite-v9",
        center: [10, 10],
        zoom: 4,
      });
      const nav = new mapboxgl.NavigationControl();
      map.addControl(nav, "bottom-right");

      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      });
      map.addControl(geolocate, "bottom-right");

      map.on("load", () => {
        setMap(map);
        map.resize();
      });

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      });
      map.addControl(geocoder, "top-right");
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, []);

  const handleViewMode = () => {
    if (flag === false) {
      setFlag(true);
      map.setStyle("mapbox://styles/mapbox/streets-v11");
    } else {
      setFlag(false);
      map.setStyle("mapbox://styles/mapbox/satellite-v9");
    }
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <div id="info"></div>
      <div ref={(el) => (mapContainer.current = el)} style={styles}></div>
      <PublicIcon onClick={handleViewMode} className={classes.icon} />
    </div>
  );
};

export default Map;

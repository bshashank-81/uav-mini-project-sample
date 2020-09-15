import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "./buttons.css";
import { makeStyles } from "@material-ui/core";
import PublicIcon from "@material-ui/icons/Public";
import "./info.css";

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
  lat: {
    position: "absolute",
  },
}));

const Map = () => {
  const classes = useStyles();
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
  const [map, setMap] = useState(null);
  const [flag, setFlag] = useState(true);
  const mapContainer = useRef(null);
  const theToken = JSON.stringify(
    JSON.parse(localStorage.getItem("fake-access-token")).token.access_token
  );

  var added_info = null;

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
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

    map.on("mousemove", (e) => {
      document.getElementById("info").innerHTML = JSON.stringify(
        e.lngLat.wrap()
      );
    });

    map.on("click", (e) => {
      JSON.stringify(e.lngLat.wrap());
      console.log("show popup");
      window.alert("you have added a location");
      fetch(process.env.REACT_APP_MOCK_SERVER + "/locations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: theToken.substr(1, theToken.length - 2),
        },
        body: JSON.stringify(e.lngLat.wrap()),
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((result) => {
              console.log("post result:" + result);
            });
          } else {
            console.log("network err");
          }
        })
        .catch((err) => {});
    });
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
      <div id="info" className="info"></div>
      <div ref={(el) => (mapContainer.current = el)} style={styles}></div>
      <PublicIcon onClick={handleViewMode} className={classes.icon} />
      <div>{added_info}</div>
    </div>
  );
};

export default Map;

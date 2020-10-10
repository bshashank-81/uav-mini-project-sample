import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "./buttons.css";
import { makeStyles } from "@material-ui/core";
import PublicIcon from "@material-ui/icons/Public";
import { useSelector } from "react-redux";

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
    right: "11px",
    bottom: "17%",
    position: "absolute",
    background: "white",
    width: "29px",
    height: "29px",
    borderRadius: "4px",
  },
}));

const Map = ({ isAddNewLocation, showLocationOnMap }) => {
  const classes = useStyles();
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
  const [map, setMap] = useState(null);
  const [flag, setFlag] = useState(true);
  const mapContainer = useRef(null);
  var theToken = null;
  if (isAddNewLocation) {
    theToken = JSON.stringify(
      JSON.parse(localStorage.getItem("fake-access-token")).token.access_token
    );
  }

  var marker;
  var urlArray = window.location.pathname.split(":");
  var id = urlArray[1];
  var lat = 10;
  var lng = 10;

  var locationList;
  locationList = useSelector((state) => {
    return {
      locations: state.locations.filter((data, i) => i === id - 1),
    };
  });

  useEffect(() => {
    if (!map) {
      if (showLocationOnMap) {
        var values = locationList.locations[0];
        if (!values) {
          lng = 0;
          lat = 0;
        } else {
          lng = locationList.locations[0].lng;
          lat = locationList.locations[0].lat;
        }
      }

      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lng, lat],
        zoom: 4,
      });

      if (showLocationOnMap) {
        marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
      }

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

      if (isAddNewLocation) {
        map.on("mousemove", (e) => {
          document.getElementById("info").innerHTML = JSON.stringify(
            e.lngLat.wrap()
          );
        });

        map.on("click", (e) => {
          JSON.stringify(e.lngLat.wrap());
          let r = window.confirm("do you want to add location?");
          if (r) {
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
          }
        });
      }
    }
  }, [locationList, map]);

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
      {isAddNewLocation === "true" ? (
        <div id="info" className="info"></div>
      ) : (
        <div id="info" className="info" style={{ display: "none" }}></div>
      )}
      <div ref={(el) => (mapContainer.current = el)} style={styles}></div>
      <PublicIcon
        onClick={handleViewMode}
        className={classes.icon}
        data-testid="publicIcon"
      />
    </div>
  );
};

export default Map;

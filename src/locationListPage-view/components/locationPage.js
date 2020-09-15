import React, { useState, useEffect } from "react";
import {
  CardContent,
  Card,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import SideBar from "../../landingPage-view/components/sideBar";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import * as Constants from "../../constants";
import { Link } from "react-router-dom";
import * as listAction from "../../locationListPage-state/actions/listAction";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    paddingLeft: "300px",
    paddingTop: "20px",
  },
  arrowUpwardIcon: {
    marginLeft: "370px",
    objectFit: "contain",
  },
  main: {
    paddingTop: "40px",
  },
  text: {
    paddingLeft: "300px",
  },
  button: {
    textTransform: "none",
    backgroundColor: "#223080",
    borderRadius: "6px",
    width: "200px",
  },
  buttonText: {
    color: "white",
  },
  links: {
    color: "#858585",
    paddingTop: "0px",
    textDecoration: "none",
    fontFamily: "Poppins",
    fontWeight: "600",
  },
}));

const LocationPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  var items = [];
  const classes = useStyles();
  const [listValues, setListValues] = useState([]);
  const [newListValues, setNewListValues] = useState([]);
  const [flag, setFlag] = useState(0);
  const theToken = JSON.stringify(
    JSON.parse(localStorage.getItem("fake-access-token")).token.access_token
  );

  useEffect(() => {
    fetch(process.env.REACT_APP_MOCK_SERVER + "/locations", {
      method: "GET",
      withCredentials: true,

      headers: {
        "Content-Type": "application/json",
        Authorization: theToken.substr(1, theToken.length - 2),
      },
    })
      .then((response) => {
        console.log("response is" + response);

        if (response.ok) {
          response.json().then((result) => {
            for (var i = 0; i < result.length; i++) {
              const action = listAction.addLocation(
                result[i].id,
                result[i].lat,
                result[i].lng
              );
              dispatch(action);
            }
            console.log("result:", result);
            setListValues(result);
          });
        }
      })
      .then((data) => console.log("data is " + data));
  }, [newListValues]);

  const locationList = useSelector((state) => {
    return {
      locations: state.locations,
    };
  });

  items = locationList.locations;

  const handleSortByIdDesc = () => {
    console.log("click sort by desc");
    console.log("list values", listValues);
    console.log("location item values", locationList.locations);
    setListValues(locationList.locations);
    items = listValues.sort((a, b) => {
      return a.id < b.id ? 1 : -1;
    });
    setNewListValues(items);
    setFlag(1);
  };

  const handleSortByIdAsc = () => {
    console.log("click sort by asc");
    setListValues(locationList.locations);
    items = listValues.sort((a, b) => {
      return a.id > b.id ? 1 : -1;
    });
    setNewListValues(items);
    setFlag(1);
  };

  return (
    <div>
      <SideBar></SideBar>

      <div className={classes.main}>
        <div style={{ marginLeft: "300px" }}>
          <Button
            className={classes.button}
            type="button"
            variant="contained"
            color="primary"
            fullWidth
          >
            <Link to="/locations/new" className={classes.links}>
              <Typography className={classes.buttonText} variant="h5">
                {Constants.NEW_LOCATION}
              </Typography>
            </Link>
          </Button>
        </div>
        <ArrowUpwardIcon
          className={classes.arrowUpwardIcon}
          onClick={handleSortByIdDesc}
        />
        <ArrowDownwardIcon onClick={handleSortByIdAsc} />

        {flag === 0 ? (
          <Card>
            <Typography variant="h6" className={classes.text}>
              {Constants.ID} {Constants.LATITUDE} {Constants.LONGITUDE}
            </Typography>
            {listValues.map((listValues) => (
              <CardContent key={listValues.id} className={classes.cardContent}>
                <Typography variant="h6">
                  {listValues.id} {listValues.lat} {listValues.lng}
                </Typography>
              </CardContent>
            ))}
          </Card>
        ) : (
          <Card>
            <Typography variant="h6" className={classes.text}>
              {Constants.ID} {Constants.LATITUDE} {Constants.LONGITUDE}
            </Typography>
            {newListValues.map((newListValues) => (
              <CardContent
                key={newListValues.id}
                className={classes.cardContent}
              >
                <Typography variant="h6">
                  {newListValues.id} {newListValues.lat} {newListValues.lng}
                </Typography>
              </CardContent>
            ))}
          </Card>
        )}
      </div>
    </div>
  );
};

export default LocationPage;

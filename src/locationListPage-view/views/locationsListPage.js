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
import { Link, useLocation } from "react-router-dom";
import * as listAction from "../../locationListPage-state/actions/listAction";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "@material-ui/core/ListItem";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    paddingLeft: theme.spacing(290 / 8),
    paddingTop: theme.spacing(2.5),
  },
  arrowUpwardIcon: {
    marginLeft: theme.spacing(370 / 8),
    objectFit: "contain",
  },
  main: {
    paddingTop: theme.spacing(5),
  },
  text: {
    paddingLeft: theme.spacing(37.5),
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
    paddingTop: theme.spacing(0),
    textDecoration: "none",
    fontFamily: "Poppins",
    fontWeight: "600",
  },
  newLinks: {
    textDecoration: "none",
    color: "black",
  },
  listButtons: {
    marginTop: theme.spacing(2.5),
    fontWeight: "600",
  },
}));

const LocationsListPage = () => {
  const dispatch = useDispatch();

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
    }).then((response) => {
      if (response.ok) {
        response.json().then((result) => {
          for (var i = 0; i < result.length; i++) {
            const addAction = listAction.addLocation(
              result[i].id,
              result[i].lat,
              result[i].lng
            );
            dispatch(addAction);
          }
          setListValues(result);
        });
      }
    });
  }, [newListValues]);

  const locationList = useSelector((state) => {
    return {
      locations: state.locations,
    };
  });

  items = locationList.locations;

  const handleSortByIdDesc = () => {
    setListValues(locationList.locations);
    items = listValues.sort((a, b) => {
      return a.id < b.id ? 1 : -1;
    });
    setNewListValues(items);
    setFlag(1);
  };

  const handleSortByIdAsc = () => {
    setListValues(locationList.locations);
    items = listValues.sort((a, b) => {
      return a.id > b.id ? 1 : -1;
    });
    setNewListValues(items);
    setFlag(1);
  };

  const navigateToLocation = (id, lat, lng) => {
    const getAction = listAction.getLocation(id, lat, lng);
    dispatch(getAction);
  };
  const location = useLocation();

  return (
    <div>
      {location.pathname === "/locations" && (
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

            <div>
              {flag === 0 ? (
                <Card>
                  <Typography variant="h6" className={classes.text}>
                    {Constants.ID} {Constants.LATITUDE} {Constants.LONGITUDE}
                  </Typography>
                  {listValues.map((listValues) => (
                    <CardContent
                      key={listValues.id}
                      className={classes.cardContent}
                    >
                      <Link
                        to={"/locations/:" + listValues.id}
                        className={classes.newLinks}
                        onClick={() =>
                          navigateToLocation(
                            listValues.id,
                            listValues.lat,
                            listValues.lng
                          )
                        }
                      >
                        {}
                        <ListItem>
                          <Typography variant="h6">
                            {listValues.id} {listValues.lat} {listValues.lng}
                          </Typography>
                        </ListItem>
                      </Link>
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
                      <Link
                        to={"/locations/:" + newListValues.id}
                        className={classes.newLinks}
                      >
                        <ListItem button>
                          <Typography
                            variant="h6"
                            onClick={() =>
                              navigateToLocation(
                                newListValues.id,
                                newListValues.lat,
                                newListValues.lng
                              )
                            }
                            data-testid="listItem"
                          >
                            {newListValues.id} {newListValues.lat}{" "}
                            {newListValues.lng}
                          </Typography>
                        </ListItem>
                      </Link>
                    </CardContent>
                  ))}
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationsListPage;

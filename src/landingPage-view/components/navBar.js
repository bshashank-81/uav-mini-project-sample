import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "rgb(9, 9, 10)",
    padding: "10px 10px 10px 10px",
    display: "block",
  },
  ul: {
    listStyleType: "none",
    margin: "auto",
  },
  login: {
    color: "rgb(255,255,10)",
    float: "right",
    paddingLeft: "50px",
    paddingRight: "20px",
  },
  maps: {
    color: "rgb(255,255,10)",
    float: "right",
  },
  uav: {
    float: "left",
  },
}));

const PrimaryAppBar = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar}>
      <ul className={classes.ul}>
        <li>
          <Typography className={classes.uav}>{"UAV"}</Typography>
        </li>
        <li>
          <Link to="/login" className={classes.login}>
            Login
          </Link>
        </li>
        <li>
          <Link to="/maps" className={classes.maps}>
            Maps
          </Link>
        </li>
      </ul>
    </AppBar>
  );
};

export default PrimaryAppBar;

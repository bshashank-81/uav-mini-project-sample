import React from "react";
import { makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "rgb(9, 9, 10)",
    padding: "10px 10px 10px 10px",
  },
  login: {
    color: "rgb(255,255,10)",
    marginLeft: "1750px",
  },
}));

const PrimaryAppBar = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar className={classes.appBar}>
        <Link to="/login" className={classes.login}>
          Login
        </Link>
      </AppBar>
    </div>
  );
};

export default PrimaryAppBar;

import React, { useState } from "react";
import { makeStyles, CssBaseline, Typography } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import * as Constants from "../../constants";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "240px",
    flexShrink: 0,
    whiteSpace: "nowrap",
    fontFamily: "Poppins",
    fontWeight: "600",
  },
  drawerPaper: {
    width: "240px",
    backgroundColor: "#fafafa",
    color: "#858585",
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: "14px",
    letterSpacing: "0",
    ["@media (max-width:1024px)"]: {
      width: "240px",
    },
    ["@media (max-width:768px)"]: {
      width: "150px",
    },
  },
  listButtons: {
    marginTop: "20px",
    fontFamily: "Poppins",
    fontWeight: "600",
  },
  links: {
    color: "#858585",
    paddingTop: "0px",
    textDecoration: "none",
    fontFamily: "Poppins",
    fontWeight: "600",
  },
  active: {
    color: "#27418b",
    borderRight: "3px solid blue",
  },
}));

const SideBar = () => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <div>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <Divider />
        <div>
          {(location.pathname === "/" || location.pathname === "/maps") && (
            <Link to="/login" className={classes.links}>
              <ListItem button className={classes.listButtons}>
                <Typography component="div">
                  <Box fontWeight={600}>{Constants.LOGIN}</Box>
                </Typography>
              </ListItem>
            </Link>
          )}
          {(location.pathname === "/" || location.pathname === "/login") && (
            <Link to="/maps" className={classes.links}>
              <ListItem button className={classes.listButtons}>
                <Typography component="div">
                  <Box fontWeight={600}>{Constants.MAPS}</Box>
                </Typography>
              </ListItem>
            </Link>
          )}
          {(location.pathname === "/locations" ||
            location.pathname === "/home" ||
            location.pathname === "/locations/new") && (
            <Link to="/locations/new" className={classes.links}>
              <ListItem button className={classes.listButtons}>
                <Typography component="div">
                  <Box fontWeight={600}>{Constants.MAPS}</Box>
                </Typography>
              </ListItem>
            </Link>
          )}
          {(location.pathname === "/locations" ||
            location.pathname === "/home" ||
            location.pathname === "/locations/new") && (
            <Link to="/locations" className={classes.links}>
              <ListItem button className={classes.listButtons}>
                <Typography component="div">
                  <Box fontWeight={600}>{Constants.LOCATIONS}</Box>
                </Typography>
              </ListItem>
            </Link>
          )}
          {(location.pathname === "/locations" ||
            location.pathname === "/home" ||
            location.pathname === "/locations/new") && (
            <Link to="/" className={classes.links}>
              <ListItem button className={classes.listButtons}>
                <Typography component="div">
                  <Box fontWeight={600}>{Constants.LOGOUT}</Box>
                </Typography>
              </ListItem>
            </Link>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default SideBar;

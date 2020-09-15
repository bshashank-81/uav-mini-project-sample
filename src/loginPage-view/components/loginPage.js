import React from "react";
import LoginForm from "./loginForm";
import { makeStyles, Typography, Grid, Paper } from "@material-ui/core";
import SideBar from "../../landingPage-view/components/sideBar";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    background: `linear-gradient(to bottom, rgba(22, 101, 216, 0.37), rgba(22, 101, 216, 0.81)),url(/assets/images/backgroundImage.jpg)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "1600px",
    height: "auto",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  gridContainer: {
    height: "755px",
  },
  formBox: {
    margin: "150px auto 10px auto",
    borderRadius: "16px",
    height: "305px",
    width: "444px",
  },
  heading: {
    float: "left",
    margin: "19px 0px 0px 30px",
    height: "33px",
    width: "70px",
    fontSize: "24px",
  },
}));

const Login = () => {
  const classes = useStyles();
  return (
    <div>
      <SideBar />
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={12} md={12} className={classes.image}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.gridContainer}
          >
            <Grid
              pr={178}
              mt={251}
              pb={249}
              item
              sm={4}
              md={3}
              component={Paper}
              elevation={6}
              className={classes.formBox}
            >
              <Typography className={classes.heading} variant="h5">
                {"Log in"}
              </Typography>
              <div className={classes.paper}>
                <LoginForm />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;

import React from "react";
import {
  makeStyles,
  Typography,
  FormControl,
  TextField,
  Button,
} from "@material-ui/core";
import * as Constants from "../../constants";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
  },
  error: {
    paddingLeft: "40px",
    color: "red",
  },
  label: {
    color: "#333333",
    fontSize: "12px",
    paddingBottom: "8px",
    float: "left",
    alignSelf: "baseline",
  },
  textField: {
    paddingBottom: "9px",
  },
  button: {
    textTransform: "none",
    backgroundColor: "#223080",
    marginTop: "5%",
    borderRadius: "6px",
  },
}));

const LoginForm = () => {
  const history = useHistory();
  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [authenticationError, setAuthenticationError] = React.useState("");
  const classes = useStyles();

  const handleChangeInUserName = (event) => {
    event.preventDefault();
    const username = event.target.value;
    console.log("user is " + username);

    setUserName(username);
    setAuthenticationError("");
  };

  const handleChangeInPassword = (event) => {
    event.preventDefault();
    const password = event.target.value;
    setPassword(password);
    setAuthenticationError("");
  };

  const handleClick = (event) => {
    event.preventDefault();
    const loginObj = {
      username: username,
      password: password,
    };

    fetch(process.env.REACT_APP_MOCK_SERVER + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginObj),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          response.json().then((result) => {
            console.log("result:", result);

            localStorage.setItem(
              "fake-access-token",
              JSON.stringify({
                token: result,
              })
            );
            history.push("/home");
          });
        } else {
          setAuthenticationError(Constants.INVALID_CREDENTIALS);
        }
      })
      .catch((err) => {
        setAuthenticationError(Constants.NETWORK_ERROR);
      });
  };

  return (
    <form className={classes.form}>
      <FormControl className={classes.textField} fullWidth>
        <Typography className={classes.label}>
          {Constants.USERNAME_LABEL}
        </Typography>
        <TextField
          placeholder={Constants.USERNAME_PLACEHOLDER}
          type="text"
          required
          fullWidth
          onChange={handleChangeInUserName}
          value={username}
        ></TextField>
      </FormControl>
      <FormControl className={classes.textField} fullWidth>
        <Typography className={classes.label}>
          {Constants.PASSWORD_LABEL}
        </Typography>
        <TextField
          placeholder={Constants.PASSWORD_PLACEHOLDER}
          required
          fullWidth
          type="Text"
          onChange={handleChangeInPassword}
          value={password}
        ></TextField>
      </FormControl>
      <Typography className={classes.error} id="error">
        {authenticationError !== "" && authenticationError}
      </Typography>
      <Button
        className={classes.button}
        type="button"
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleClick}
      >
        {Constants.SIGN_IN}
      </Button>
    </form>
  );
};

export default LoginForm;

import logo from "../logo.png";
import classes from "./LogInForm.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal/Modal";
import { LOADING } from "../constants";
import { API_REQUEST_LOGIN } from "../constants";

import useHttp from "../hooks/use-http";
import { Button, Alert } from "react-bootstrap";
import { LOGIN_ERROR } from "../constants";
const LogInForm = () => {
  const dispatch = useDispatch();

  const [isValidForm, setIsValidForm] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const IsLoadingData = useSelector((state) => state.articles.IsLoadingData);

  const navigate = useNavigate();

  const changeUserNameHandler = (event) => {
    setInvalidCredentials(false);
    setEnteredUserName(event.target.value);
  };

  const changePasswordHandler = (event) => {
    setInvalidCredentials(false);
    setEnteredPassword(event.target.value);
  };

  useEffect(() => {
    setIsValidForm(enteredUserName !== "" && enteredPassword !== "");
  }, [enteredPassword, enteredUserName]);

  const requestConfig = {
    url: "http://34.245.213.76:3000/auth/signin",
    method: "POST",
    body: JSON.stringify({
      username: enteredUserName,
      password: enteredPassword,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    label: API_REQUEST_LOGIN,
  };
  const onSuccess = () => {
    navigate("/dashboard");
    setInvalidCredentials(false);
    setIsValidForm(enteredUserName !== "" && enteredPassword !== "");
  };

  const onFailure = () => {
    setEnteredPassword("");
    setEnteredUserName("");
    setInvalidCredentials(true);
    setIsValidForm(enteredUserName !== "" && enteredPassword !== "");
  };

  const httpData = useHttp();
  const { sendRequest: logInSubmit } = httpData;

  const submit = (event) => {
    event.preventDefault();
    dispatch(logInSubmit(requestConfig, onSuccess, onFailure));
  };

  let disable = !isValidForm || IsLoadingData;
  return (
    <main className={classes.auth}>
      <section>
        <img alt="logo" className={classes.loginlogo} src={logo}></img>

        <form onSubmit={submit}>
          <h3 className={classes.textalign}>Log in</h3>

          <div className="form-group">
            <label>UserName</label>
            <input
              onChange={changeUserNameHandler}
              type="text"
              className="form-control"
              placeholder="Enter UserName"
              value={enteredUserName}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              onChange={changePasswordHandler}
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={enteredPassword}
            />
          </div>

          {invalidCredentials && (
            <Alert className={classes.loginerror} variant="danger">
              {LOGIN_ERROR}
            </Alert>
          )}
          <Modal isLoading={true} label={LOADING} show={IsLoadingData} />
          <div>
            <Button
              className={classes.loginbutton}
              type="submit"
              disabled={disable}
            >
              Sign in
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
};
export default LogInForm;

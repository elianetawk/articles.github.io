import logo from "../logo.png";
import classes from "./LogInForm.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logInActions } from "../store/index";
import Modal from "./Modal/Modal";
import Backdrop from "./Backdrop/Backdrop";
const LogInForm = (props) => {
  const dispatch = useDispatch();

  const [isValidForm, setIsValidForm] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const navigate = useNavigate();

  const changeUserNameHandler = (event) => {
    setInvalidCredentials(false);
    setEnteredUserName(event.target.value);
  };
  useEffect(() => {
    setIsValidForm(enteredUserName !== "" && enteredPassword !== "");
    console.log("enteredUserName");
    console.log(enteredUserName);
    console.log("enteredPassword");
    console.log(enteredPassword);
    console.log("IsValidForm");
    console.log(enteredUserName !== "" && enteredPassword !== "");
  }, [enteredPassword, enteredUserName]);
  const changePasswordHandler = (event) => {
    setInvalidCredentials(false);
    setEnteredPassword(event.target.value);
  };

  async function logInSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    let logInUser = { username: enteredUserName, password: enteredPassword };
    const response = await fetch("http://34.245.213.76:3000/auth/signin", {
      method: "POST",
      body: JSON.stringify(logInUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (data["accessToken"]) {
      dispatch(logInActions.storeAccessToken(data["accessToken"]));
      navigate("/dashboard");
      setInvalidCredentials(false);
      setErrorMessage("");
    } else {
      setEnteredPassword("");
      setEnteredUserName("");
      setErrorMessage(data.message);
      setInvalidCredentials(true);
    }
    setIsValidForm(enteredUserName !== "" && enteredPassword !== "");
    setIsLoading(false);
    console.log("logInSubmit");
  }
  return (
    <main className={classes.auth}>
      <section>
        <img
          alt="logo"
          style={{ width: "100%", height: "150px" }}
          src={logo}
        ></img>
        <h1 style={{ color: "#69f5ee" }}>Log In</h1>
        <form onSubmit={logInSubmit}>
          <div className={classes.control}>
            <label
              style={{
                color: "#69f5ee",
                fontWeight: "bold",
                textAlign: "left",
              }}
              htmlFor="Useranme"
            >
              User Name
            </label>
            <input
              value={enteredUserName}
              onChange={changeUserNameHandler}
              type="text"
              id="text"
            />
          </div>
          <div className={classes.control}>
            <label
              style={{
                fontWeight: "bold",
                textAlign: "left",
              }}
              htmlFor="password"
            >
              Password
            </label>
            <input
              onChange={changePasswordHandler}
              type="password"
              id="password"
              value={enteredPassword}
            />
          </div>
          {invalidCredentials && (
            <h1 style={{ color: "red" }}>{errorMessage}</h1>
          )}
          <Modal isLoading={true} label="Loading ... " show={isLoading} />
          <Backdrop show={isLoading} />

          <button
            style={{ backgroundColor: "#69f5ee" }}
            disabled={!isValidForm || isLoading}
          >
            Login
          </button>
        </form>
      </section>
    </main>
  );
};
export default LogInForm;

import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import loginImage from "../../assets/undraw_Newspaper_re_syf5.png";
import styles from "./LoginForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import loginValidaion from "./validations/login-validations";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverErrors, setServerErrors] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = { email, password };
    const formValidation = loginValidaion(formData);
    if (!_.isEmpty(formValidation)) {
      setFormErrors(formValidation);
      return;
    }
    try {
      const result = await axios.post(
        "http://localhost:3030/users/login",
        formData
      );
      localStorage.setItem("token", JSON.stringify(result.data));
      const token = JSON.parse(localStorage.getItem("token"));
      if (token.role === "admin") {
        navigate("/adminDashboard");
      } else if (token.role) {
        navigate("/feeds");
      }
    } catch (error) {
      setServerErrors(error.response.data.errors);
      console.log(error);
    }
  };
  const textfield = [
    {
      name: "email",
      value: email,
      label: "Email",
      handleChange: e => setEmail(e.target.value),
      type: "text",
    },
    {
      name: "password",
      value: password,
      label: "Password",
      handleChange: e => setPassword(e.target.value),
      type: "password",
    },
  ];
  return (
    // Container for background image
    <div className={styles.backgroundImageContainer}>
      {/* Main container for login form */}
      <Container className={styles.main_container}>
        {/* Paper component for elevation and styling */}
        <Paper elevation={2} className="border_radius">
          {/* Grid container for arranging items */}
          <Grid container className={styles.formContainer}>
            {/* Grid item for login image */}
            <Grid item md={5} className={styles.loginImage_container}>
              {/* Login image */}
              <img src={loginImage} alt="login" className={styles.loginImage} />
            </Grid>
            {/* Grid item for login form */}
            <Grid item md={7} className="internal_padding">
              <form onSubmit={handleSubmit}>
                {/* Container for text fields */}
                <Grid
                  container
                  className={styles.textfield_container}
                  spacing={3}
                >
                  {/* Grid item for login form title */}
                  <Grid item md={8}>
                    <Typography variant="h3">Login Form</Typography>
                  </Grid>
                  {/* Grid item for email text field */}
                  {textfield.map(
                    ({ name, value, label, handleChange, type }, i) => {
                      return (
                        <Grid item md={8} key={i}>
                          <TextField
                            fullWidth
                            id={label}
                            variant="standard"
                            autoComplete="off"
                            type={type}
                            label={label}
                            value={value}
                            onChange={handleChange}
                            error={
                              !_.isEmpty(serverErrors) ||
                              Boolean(formErrors[name])
                            }
                            helperText={
                              (!_.isEmpty(serverErrors) &&
                                serverErrors[i]?.msg) ||
                              (!_.isEmpty(formErrors) && formErrors[name])
                            }
                          />
                        </Grid>
                      );
                    }
                  )}
                  {/* Grid item for login button */}
                  <Grid item md={8}>
                    <Button variant="contained" fullWidth type="submit">
                      Login
                    </Button>
                  </Grid>
                  {/* Grid item for register link */}
                  <Grid item md={8}>
                    <Typography variant="body2">
                      Not a user? <Link to={"/register"}>Register</Link>
                    </Typography>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginForm;

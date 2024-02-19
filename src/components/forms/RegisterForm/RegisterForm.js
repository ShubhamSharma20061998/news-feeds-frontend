import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import styles from "./RegisterForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import _ from "lodash";
import registrationValidaion from "./validations/RegisterValidation";
import axios from "axios";

const RegisterForm = () => {
  // State variables to store form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverErrors, setServerErrors] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  // Form submit handler
  const handleSubmit = async e => {
    e.preventDefault();
    const formData = { name, email, password };
    const formValidation = registrationValidaion(formData);
    if (!_.isEmpty(formValidation)) {
      setFormErrors(formValidation);
      return;
    }
    try {
      const result = await axios.post(
        "http://localhost:3030/users/register",
        formData
      );
      if (result) {
        navigate("/");
      }
    } catch (error) {
      setServerErrors(error.response.data.errors);
    }
  };

  const textField = [
    {
      name: "name",
      label: "Name",
      value: name,
      handleChange: e => setName(e.target.value),
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      value: email,
      handleChange: e => setEmail(e.target.value),
      type: "text",
    },
    {
      name: "password",
      label: "Password",
      value: password,
      handleChange: e => setPassword(e.target.value),
      type: "password",
    },
  ];

  return (
    // Background image container
    <div className={styles.backgroundImageContainer}>
      {/* Main container */}
      <Container className={styles.main_container}>
        {/* Paper component for elevation and border */}
        <Paper elevation={2} className="border_radius">
          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Form Grid container */}
            <Grid
              container
              className={`${styles.formContainer} internal_padding`}
              spacing={2}
            >
              {/* Title */}
              <Grid item md={10} xs={10}>
                <Typography variant="h3">Registration Form</Typography>
              </Grid>
              {/* Form fields */}
              <Grid item md={10} xs={10}>
                {textField.map(
                  ({ name, label, type, handleChange, value }, i) => {
                    return (
                      <TextField
                        key={i}
                        fullWidth
                        id={label}
                        label={label}
                        variant="standard"
                        autoComplete="off"
                        sx={{ marginBottom: "1rem" }}
                        value={value}
                        onChange={handleChange}
                        type={type}
                        error={
                          !_.isEmpty(serverErrors) || Boolean(formErrors[name])
                        }
                        helperText={
                          (!_.isEmpty(serverErrors) && serverErrors[i]?.msg) ||
                          (!_.isEmpty(formErrors) && formErrors[name])
                        }
                      />
                    );
                  }
                )}
              </Grid>
              {/* Submit button */}
              <Grid item md={10} xs={10}>
                <Button variant="contained" fullWidth type="submit">
                  Register
                </Button>
              </Grid>
              {/* Link to register */}
              <Grid item md={10} xs={10}>
                <Typography variant="body2">
                  Not a user? <Link to={"/"}>Login</Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default RegisterForm;

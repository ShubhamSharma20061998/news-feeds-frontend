import { Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import styles from "./RegisterForm.module.css"; // Import CSS styles for this component
import { Link, useNavigate } from "react-router-dom"; // Import necessary components from react-router-dom
import _ from "lodash"; // Import lodash utility library
import registrationValidaion from "./validations/RegisterValidation"; // Import validation function
import axios from "axios"; // Import axios for making HTTP requests

const RegisterForm = () => {
  // State variables to store form data
  const [name, setName] = useState(""); // Name input state
  const [email, setEmail] = useState(""); // Email input state
  const [password, setPassword] = useState(""); // Password input state
  const [serverErrors, setServerErrors] = useState({}); // Server-side validation errors
  const [formErrors, setFormErrors] = useState({}); // Client-side validation errors
  const navigate = useNavigate(); // Navigation function from react-router-dom

  // Form submit handler
  const handleSubmit = async e => {
    e.preventDefault(); // Prevent default form submission behavior
    setFormErrors({}); // Clear client-side form errors
    setServerErrors({}); // Clear server-side errors
    const formData = { name, email, password }; // Create an object with form data
    const formValidation = registrationValidaion(formData); // Validate form data
    if (!_.isEmpty(formValidation)) {
      // If there are validation errors
      setFormErrors(formValidation); // Set client-side form errors
      return; // Exit early
    }
    try {
      // Attempt to register user by making a POST request
      const result = await axios.post("http://localhost:3030/users/register", formData);
      if (result) {
        // If registration is successful
        navigate("/"); // Redirect to home page
      }
    } catch (error) {
      // If there's an error from the server
      setServerErrors(error.response.data.errors); // Set server-side errors
    }
  };

  // Define an array of text fields for rendering
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
            <Grid container className={`${styles.formContainer} internal_padding`} spacing={2}>
              {/* Title */}
              <Grid item md={10} xs={10}>
                <Typography variant="h3">Registration Form</Typography>
              </Grid>
              {/* Form fields */}
              <Grid item md={10} xs={10}>
                {textField.map(({ name, label, type, handleChange, value }, i) => {
                  return <TextField key={i} fullWidth id={label} label={label} variant="standard" autoComplete="off" sx={{ marginBottom: "1rem" }} value={value} onChange={handleChange} type={type} error={!_.isEmpty(serverErrors) || Boolean(formErrors[name])} helperText={(!_.isEmpty(serverErrors) && serverErrors[i]?.msg) || (!_.isEmpty(formErrors) && formErrors[name])} />;
                })}
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

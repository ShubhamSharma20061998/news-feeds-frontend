const loginValidaion = formData => {
  const errors = {};
  //email
  if (formData.email.length === 0) {
    errors.email = "email is required.";
  }
  //password
  if (formData.password.length === 0) {
    errors.password = "password is required";
  }
  return errors;
};

export default loginValidaion;

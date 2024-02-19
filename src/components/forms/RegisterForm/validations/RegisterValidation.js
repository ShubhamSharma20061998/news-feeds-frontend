const registrationValidaion = formData => {
  const errors = {};
  //email
  if (formData.name.length === 0) {
    errors.name = "name is required.";
  }
  //password
  if (formData.email.length === 0) {
    errors.email = "email is required";
  }
  if (formData.password.length === 0) {
    errors.password = "password is required";
  }
  return errors;
};

export default registrationValidaion;

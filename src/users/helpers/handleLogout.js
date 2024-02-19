export const handleLogout = navigate => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("userId");
  navigate("/");
};

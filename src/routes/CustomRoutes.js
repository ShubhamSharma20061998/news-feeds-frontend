import { useRoutes } from "react-router-dom"; // Import the useRoutes hook from react-router-dom
import LoginForm from "../components/forms/loginForm/LoginForm"; // Import the LoginForm component
import RegisterForm from "../components/forms/RegisterForm/RegisterForm"; // Import the RegisterForm component
import AdminLanding from "../admin/pages/AdminLanding"; // Import the AdminLanding component
import UserLandingPage from "../users/pages/UserLandingPage"; // Import the UserLandingPage component

const CustomRoutes = () => {
  // Define your custom routes using the useRoutes hook
  let myRoutes = useRoutes([
    { path: "/", element: <LoginForm /> }, // Route for the login form
    { path: "/register", element: <RegisterForm /> }, // Route for the registration form
    { path: "/adminDashboard", element: <AdminLanding /> }, // Route for the admin dashboard
    { path: "/feeds", element: <UserLandingPage /> }, // Route for the user landing page
  ]);

  return myRoutes; // Return the defined routes
};

export default CustomRoutes;

import { useRoutes } from "react-router-dom";
import LoginForm from "../components/forms/loginForm/LoginForm";
import RegisterForm from "../components/forms/RegisterForm/RegisterForm";
import AdminLanding from "../admin/pages/AdminLanding";
import UserLandingPage from "../users/pages/UserLandingPage";

const CustomRoutes = () => {
  let myRoutes = useRoutes([
    { path: "/", element: <LoginForm /> },
    { path: "/register", element: <RegisterForm /> },
    { path: "/adminDashboard", element: <AdminLanding /> },
    { path: "/feeds", element: <UserLandingPage /> },
  ]);
  return myRoutes;
};

export default CustomRoutes;

import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/home";
import Main from "../pages/main";
import Mall from "../pages/mall";
import User from "../pages/user";
import PageOne from "../pages/other/PageOne";
import PageTwo from "../pages/other/PageTwo";
import Login from "../pages/login/login";

const routes = [
  {
    path: "/",
    Component: Main,
    children: [
      {
        path: "/",
        element: <Navigate to="home" replace />,
      },
      {
        path: "home",
        Component: Home,
      },
      {
        path: "mall",
        Component: Mall,
      },
      {
        path: "user",
        Component: User,
      },
      {
        path: "other",
        children: [
          {
            path: "pageOne",
            Component: PageOne,
          },
          {
            path: "pageTwo",
            Component: PageTwo,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
];
export default createBrowserRouter(routes);

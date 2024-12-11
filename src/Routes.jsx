import {createBrowserRouter} from "react-router-dom";
import Login from './Pages/Login'
import Register from './Pages/Register'
import HomeLayout from "./Layouts/HomeLayout";
// import Network from "../Pages/Network.jsx"
import Jobs from "./Pages/Jobs.jsx";
import ProfileLayout from "./Layouts/ProfileLayout";
import Messaging from './Pages/Messaging.jsx'
import ConnectionLayout from "./Layouts/ConnectionLayout.jsx";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Register />,
    },
    {
      path: "/home",
      element: <HomeLayout />,
    },
    {
      path: "/network",
      element: <ConnectionLayout />,
    },
    {
      path: "/jobs",
      element: <Jobs />,
    },
    {
      path: "/profile",
      element: <ProfileLayout />,
    },
    {
      path: "/messaging",
      element: <Messaging />,
    },

  ]);
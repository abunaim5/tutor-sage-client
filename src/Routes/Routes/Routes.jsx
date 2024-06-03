import { createBrowserRouter } from "react-router-dom";
import Home from "../../Pages/Home/Home/Home";
import Main from "../../Layout/Main";
import LogIn from "../../Pages/LogIn/LogIn";
import SignUp from "../../Pages/SignUp/SignUp";
import AllClasses from "../../Pages/AllClasses/AllClasses";
import ClassDetails from "../../Pages/ClassDetails/ClassDetails";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    //   errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: '/register',
          element: <SignUp />
        },
        {
          path: '/login',
          element: <LogIn />
        },
        {
          path: '/classes',
          element: <AllClasses />
        },
        {
          path: '/class-details/:id',
          element: <ClassDetails />
        }
      ],
    },
  ]);

  export default router;
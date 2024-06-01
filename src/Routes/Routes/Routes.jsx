import { createBrowserRouter } from "react-router-dom";
import Home from "../../Pages/Home/Home/Home";
import Main from "../../Layout/Main";
import LogIn from "../../Pages/LogIn/LogIn";


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
          path: '/login',
          element: <LogIn />
        }
      ],
    },
  ]);

  export default router;
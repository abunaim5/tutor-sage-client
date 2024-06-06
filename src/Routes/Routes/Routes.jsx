import { createBrowserRouter } from "react-router-dom";
import Home from "../../Pages/Home/Home/Home";
import Main from "../../Layout/Main";
import LogIn from "../../Pages/LogIn/LogIn";
import SignUp from "../../Pages/SignUp/SignUp";
import AllClasses from "../../Pages/AllClasses/AllClasses";
import ClassDetails from "../../Pages/ClassDetails/ClassDetails";
import BecomeATutor from "../../Pages/BecomeATutor/BecomeATutor";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Dashboard from "../../Layout/Dashboard";
import TeacherRequest from "../../Pages/Dashboard/TeacherRequest/TeacherRequest";
import Users from "../../Pages/Dashboard/Users/Users";
import ClassRequests from "../../Pages/Dashboard/ClassRequests/ClassRequests";
import MyClass from "../../Pages/Dashboard/MyClass/MyClass";
import AddClass from "../../Pages/Dashboard/AddClass/AddClass";
import UpdateClass from "../../Pages/Dashboard/UpdateClass/UpdateClass";
import Payment from "../../Pages/Payment/Payment";
import MyEnrollClass from "../../Pages/Dashboard/MyEnrollClass/MyEnrollClass";


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
          element: <PrivateRoute><ClassDetails /></PrivateRoute>
        },
        {
          path: '/become-a-tutor',
          element: <PrivateRoute><BecomeATutor /></PrivateRoute>
        },
        {
          path: '/payment/:id',
          element: <Payment />
        }
      ],
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
      // errorElement: <ErrorPage />,
      children: [
        // admin related routes
        {
          path: '/dashboard/teacher-requests',
          element: <TeacherRequest />
        },
        {
          path: '/dashboard/users',
          element: <Users />
        },
        {
          path: '/dashboard/class-requests',
          element: <ClassRequests />
        },

        // teachers related routes
        {
          path: '/dashboard/add-class',
          element: <AddClass />
        },
        {
          path: '/dashboard/update-class/:id',
          element: <UpdateClass />
        },
        {
          path: '/dashboard/my-class',
          element: <MyClass />
        },

        // students related routes
        {
          path: '/dashboard/my-enroll-class',
          element: <MyEnrollClass />
        }
      ]
    }
  ]);

  export default router;
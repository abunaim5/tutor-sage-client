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
import MyEnrollClassDetails from "../../Pages/Dashboard/MyEnrollClassDetails/MyEnrollClassDetails";
import MyClassDetails from "../../Pages/Dashboard/MyClassDetails/MyClassDetails";
import AdminRoute from "../PrivateRoute/AdminRoute";
import TeacherRoute from "../PrivateRoute/TeacherRoute";
import AdminProfile from "../../Pages/Dashboard/AdminProfile/AdminProfile";


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
        path: '/become-an-instructor',
        element: <PrivateRoute><BecomeATutor /></PrivateRoute>
      },
      {
        path: '/payment/:id',
        element: <PrivateRoute><Payment /></PrivateRoute>
      }
    ],
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    // errorElement: <ErrorPage />,
    children: [
      // admin related routes
      {
        path: '/dashboard/profile',
        element: <AdminRoute><AdminProfile /></AdminRoute>
      },
      {
        path: '/dashboard/teacher-requests',
        element: <AdminRoute><TeacherRequest /></AdminRoute>
      },
      {
        path: '/dashboard/users',
        element: <AdminRoute><Users /></AdminRoute>
      },
      {
        path: '/dashboard/class-requests',
        element: <AdminRoute><ClassRequests /></AdminRoute>
      },

      // teachers related routes
      {
        path: '/dashboard/add-class',
        element: <TeacherRoute><AddClass /></TeacherRoute>
      },
      {
        path: '/dashboard/update-class/:id',
        element: <TeacherRoute><UpdateClass /></TeacherRoute>
      },
      {
        path: '/dashboard/my-class',
        element: <TeacherRoute><MyClass /></TeacherRoute>
      },
      {
        path: '/dashboard/my-class/:id',
        element: <TeacherRoute><MyClassDetails /></TeacherRoute>
      },

      // students related routes
      {
        path: '/dashboard/my-enroll-class',
        element: <MyEnrollClass />
      },
      {
        path: '/dashboard/my-enroll-class/:id',
        element: <MyEnrollClassDetails />
      }
    ]
  }
]);

export default router;
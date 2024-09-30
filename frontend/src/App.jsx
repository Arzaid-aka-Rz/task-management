import PropTypes from "prop-types";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Home from "./components/Home";
import Layout from "./layout/Layout";
import Completed from "./components/Completed";
import Pending from "./components/Pending";
import Overdue from "./components/Overdue";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function App() {


  
  const ProtectedRoutes = ({ children }) => {
    const { isLoggedIn } = useSelector((store) => store.auth);
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    return children
  };
  
  ProtectedRoutes.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const AuthenticatedUser = ({ children }) => {
    const { isLoggedIn,user } = useSelector((store) => store.auth);
    if (isLoggedIn && user) {
      return <Navigate to="/" replace />;
    }
    return children;
  };
  

  AuthenticatedUser.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes>
          <Layout />
        </ProtectedRoutes>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/completed",
          element: <Completed />,
        },
        {
          path: "/pending",
          element: <Pending />,
        },
        {
          path: "/overdue",
          element: <Overdue />,
        },
      ],
    },

    {
      path: "/signup",
      element: (
        <AuthenticatedUser>
          <Signup />
        </AuthenticatedUser>
      ),
    },
    {
      path: "/login",
      element: (
        <AuthenticatedUser>
          <Login />
        </AuthenticatedUser>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
}

export default App;

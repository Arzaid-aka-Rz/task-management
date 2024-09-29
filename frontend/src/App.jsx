import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Home from "./components/Home";
import Layout from "./layout/Layout";
import Completed from "./components/Completed";
import Pending from "./components/Pending";
import Overdue from "./components/Overdue";

function App() {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
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
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
}

export default App;

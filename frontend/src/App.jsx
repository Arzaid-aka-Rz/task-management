import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Home from "./components/Home";


function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
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

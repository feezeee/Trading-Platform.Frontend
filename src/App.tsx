import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Navbar from "./components/smart/Navigation/Navigation";
import Product from "./components/simple/products/Product";
import ProfileMenu from "./components/ordinary/profile_menu/ProfileMenu";
import React from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Navbar userFirstName={"Махмедахмадиниджан"} userProfileUrl={null} />
    ),
  },
]);

function App() {
  return (
    // <React.StrictMode>
    //   <RouterProvider router={router} />
    // </React.StrictMode>
    <div>
      <Navbar userFirstName={"Махмедахмадиниджан"} userProfileUrl={null} />
    </div>

    // <div className="container mx-auto max-w-2xl pt-5">
    //   <Product />
    //   <Product />
    //   <Product />
    //   <Product />
    //   <Product />
    // </div>
  );
}

export default App;

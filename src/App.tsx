import {
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";

import Navbar from "./components/smart/Navigation";
import Product from './components/simple/products/Product';
import React from 'react';

const router = createBrowserRouter([
	{
	  path: "/",
	  element: <Navbar />,
	},
  ]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
    // <div className="container mx-auto max-w-2xl pt-5">
    //   <Product />
    //   <Product />
    //   <Product />
    //   <Product />
    //   <Product />
    // </div>    
  )
}

export default App;

// config/routes.config.ts

// import { routesPrefix } from "./api.config";

// export const productBrowserRoutes = {
// 	getOne: (to: string = ":code") => `/product/${to}`,
// 	search: (param: string = ":search") => `/search/${param}`,
// };

// export const productAPIRoutes = {
// 	getOne: (code: string) => `${routesPrefix}/product/code/${code}`,
// 	search: () => `${routesPrefix}/product/search`,
// };

import {
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";

import React from "react";
import ReactDOM from "react-dom/client";

// const router = createBrowserRouter([
// 	{
// 	  path: "/",
// 	  element: <div>Hello world!</div>,
// 	},
//   ]);
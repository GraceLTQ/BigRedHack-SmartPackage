import { lazy } from "react";
import { createBrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./Homepage"));


const router = createBrowserRouter(
  [
    { index: true, element: <Navigate to="/" /> },
    { path: "homepage", element: <Home /> },
  ]
);

export default router;

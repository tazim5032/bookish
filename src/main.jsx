import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import ErrorPage from "./Pages/ErrorPage";
import Home from "./Pages/Home";
import Books from "./Pages/Books";
import BookDetails from "./Pages/BookDetails";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <ErrorPage/>,
    children:[
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/books",
        element: <Books/>
      },
      {
        path: "/books/:id",
        element: <BookDetails></BookDetails>
      }
    ]
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

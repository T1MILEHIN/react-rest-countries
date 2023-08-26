import Greeting from "./components/Greeting";
import Nav from "./components/Nav";
import Each from "./components/Each";
import ErrorElement from "./components/ErrorElement";
import FilterCountry from "./components/FilterCountry";
import FetchData from "./pages/FetchData"
import Currency from "./pages/Currency";
import Capital from "./pages/Capital";
import Language from "./pages/Language";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav/>,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: <Greeting />,
      },
      {
        path: ":filter",
        element: <FetchData />,
        children: [
          {
            index: true,
            element: <FilterCountry />,
          }
        ]
      },
      {
        path: "currency",
        element: <Currency />
      },
      {
        path: "capital",
        element: <Capital />
      },
      {
        path: "language",
        element: <Language />
      },
    ]
  },
  {
    path: "/country/:name",
    element: <Each />,
  },
]);

function App() {
  return ( 
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;

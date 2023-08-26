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
    element: < Nav/>,
    errorElement: <ErrorElement />,
    children: [
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
//population, name, image, area, region, official name, carside with a card icon, subregion, start of week
function App() {
  return ( 
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;

import Nav from "./components/Nav";
import Each from "./components/Each";
import FetchData from "./pages/FetchData"
import Currency from "./pages/Currency";
import Capital from "./pages/Capital";
import Language from "./pages/Language";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: < Nav/>,
    errorElement: <div className="min-h-screen flex justify-center items-center font-black text-4xl"><p>PAGE NOT FOUND</p></div>,
    children: [
      {
        index: true,
        element: <FetchData />
      },
      {
        path: "/currency",
        element: <Currency />
      },
      {
        path: "/capital",
        element: <Capital />
      },
      {
        path: "/language",
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

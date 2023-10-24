import { NavBar } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { HomePage } from "./components/Home";
import { TableEntry } from "./components/lineItem"

const AppRoutes = [
  {
        index: true,
        element: <HomePage />
  },
  {
    path: '/counter',
    element: <NavBar />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  }
];

export default AppRoutes;

import { NavBar } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { HomePage } from "./components/Home";
import { TableEntry } from "./components/TableEntry"
import { Table2 } from "./components/Table"

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
      element: <Table2 />
  }
];

export default AppRoutes;

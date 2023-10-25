import { NavBar } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { HomePage } from "./components/Home";
import { TableEntry } from "./components/TableEntry"
import { Table2 } from "./components/Table"
import { SettingsPage } from "./components/Settings";

const AppRoutes = [
  {
        index: true,
        element: <HomePage />
  },
  {
    path: '/a',
    element: <SettingsPage />
  },
  {
      path: '/fetch-data',
      element: <Table2 />
  }
];

export default AppRoutes;

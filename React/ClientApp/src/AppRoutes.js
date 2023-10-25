import { NavBar } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { HomePage } from "./components/Home";
import { TableEntry } from "./components/TableEntry"
import { Table2 } from "./components/Table"
import { SettingsPage } from "./components/Settings";
//import { } from "./components/";

const AppRoutes = [
  {
        index: true,
        element: <HomePage />
  },
  {
    path: '/settings',
    element: <SettingsPage />
  },
  {
      path: '/excluded',
      element: <Table2 />
  }
];

export default AppRoutes;

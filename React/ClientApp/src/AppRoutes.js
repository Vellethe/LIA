//import { HomePage } from "./components/Home";
import { HomePage2, HomePage } from "./components/Home";
import { SettingsPage } from "./components/Settings";
import { ExcludedPage } from "./components/ExcludedPage"
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
      element: <ExcludedPage />
  }
];

export default AppRoutes;

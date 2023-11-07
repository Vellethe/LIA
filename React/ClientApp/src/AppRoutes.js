//import { HomePage } from "./components/Home";
import { HomePage } from "./components/HomePage";
import { SettingsPage } from "./components/SettingsPage";
import { ExcludedPage } from "./components/ExcludedPage";
import {DescriptionPage } from "./components/Description"

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
  },
];

export default AppRoutes;

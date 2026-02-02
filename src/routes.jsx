import {
  HomeIcon,
  ServerStackIcon,
  RectangleStackIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import { Home, SamplePages, StrukturFile } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "struktur file",
        path: "/struktur-file",
        element: <StrukturFile />,
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "sample pages",
        path: "/sample-pages",
        element: <SamplePages />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;

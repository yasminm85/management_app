import {
  HomeIcon,
  ServerStackIcon,
  RectangleStackIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import { Home, SamplePages, StrukturFile } from "@/pages/dashboard";
import { SignIn, ResetPassword } from "@/pages/auth";

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
    // title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
        hidden: true,
      },
      // {
      //   icon: <RectangleStackIcon {...icon} />,
      //   name: "sign up",
      //   path: "/sign-up",
      //   element: <SignUp />,
      //   hidden: true,
      // },
      // {
      //   icon: <RectangleStackIcon {...icon} />,
      //   name: "verify otp",
      //   path: "/verify-otp",
      //   element: <VerifyToken />,
      //   hidden: true,
      // },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "reset password",
        path: "/reset-password",
        element: <ResetPassword />,
        hidden: true,
      },
    ],
  },
];

export default routes;

import {
  HomeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  AcademicCapIcon,
  PencilIcon,
  PrinterIcon,
  RectangleGroupIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";
import { Home, PersonalInfo, Profile } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import Students from "./pages/dashboard/students";
import { ReactNode } from "react";
import Export from "./layouts/exports";
import AddStudent from "./components/addStudent";
import { Faculties } from "./pages/dashboard/faculty";
import { Sectors } from "./pages/dashboard/sector";
import AcademicYear from "./pages/dashboard/academicYear";
import Agents from "./pages/dashboard/agents";
import { RoleEnum } from "./entities/role.entity";
import AuthProvider from "./provider/authProvider";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export type RouteType = {
  title?: string;
  layout: string;
  pages: Array<{
    icon: ReactNode;
    name: string;
    path: string;
    element: ReactNode;
    access?: RoleEnum[];
  }>;
};

export const routes: Array<RouteType> = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <RectangleGroupIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
        access: [RoleEnum.ADMIN, RoleEnum.AGENT],
      },
      {
        icon: <AcademicCapIcon {...icon} />,
        name: "students",
        path: "/students",
        element: (
          <AuthProvider access={[RoleEnum.AGENT]}>
            <Students />
          </AuthProvider>
        ),
        access: [RoleEnum.AGENT],
      },
      {
        icon: <AcademicCapIcon {...icon} />,
        name: "agents",
        path: "/agents",
        element: (
          <AuthProvider access={[RoleEnum.ADMIN]}>
            <Agents />
          </AuthProvider>
        ),
        access: [RoleEnum.ADMIN],
      },
      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "profile",
      //   path: "/profile",
      //   element: <Profile />,
      //   access: [RoleEnum.ADMIN, RoleEnum.AGENT],
      // },
      {
        icon: <PencilIcon {...icon} />,
        name: "personal info",
        path: "/personal-info",
        element: (
          <AuthProvider access={[RoleEnum.AGENT]}>
            <PersonalInfo />
          </AuthProvider>
        ),
      },
      {
        icon: <PencilIcon {...icon} />,
        name: "personal info",
        path: "/personal-info/:id",
        element: (
          <AuthProvider access={[RoleEnum.ADMIN, RoleEnum.AGENT]}>
            <PersonalInfo />
          </AuthProvider>
        ),
      },
      {
        icon: <PrinterIcon {...icon} />,
        name: "export card",
        path: "/export-card",
        element: (
          <AuthProvider access={[RoleEnum.AGENT]}>
            <Export />
          </AuthProvider>
        ),
        access: [RoleEnum.AGENT],
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "add student",
        path: "/add-student",
        element: (
          <AuthProvider access={[RoleEnum.AGENT]}>
            <AddStudent />
          </AuthProvider>
        ),
        access: [RoleEnum.AGENT],
      },
      {
        icon: <AcademicCapIcon {...icon} />,
        name: "faculty",
        path: "/faculty",
        element: (
          <AuthProvider access={[RoleEnum.ADMIN]}>
            <Faculties />
          </AuthProvider>
        ),
        access: [RoleEnum.ADMIN],
      },
      {
        icon: <AcademicCapIcon {...icon} />,
        name: "sector",
        path: "/sector",
        element: (
          <AuthProvider access={[RoleEnum.ADMIN]}>
            <Sectors />
          </AuthProvider>
        ),
        access: [RoleEnum.ADMIN],
      },
      {
        icon: <CalendarDaysIcon {...icon} />,
        name: "academic year",
        path: "/academic-year",
        element: (
          <AuthProvider access={[RoleEnum.ADMIN]}>
            <AcademicYear />
          </AuthProvider>
        ),
        access: [RoleEnum.ADMIN],
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
        access: [RoleEnum.ADMIN, RoleEnum.AGENT],
      },
    ],
  },
  
];

export default routes;

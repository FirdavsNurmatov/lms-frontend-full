import RoleChecker from "../components/RoleChecker";
import Dashboard from "../pages/dashboard";
import Groups from "../pages/groups";
import Logout from "../pages/logout/logout";
import Profile from "../pages/profile";
import Settings from "../pages/settings/settings";
import Students from "../pages/students/students";
import Teachers from "../pages/teachers/teachers";

export enum Roles {
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

interface RouteT {
  index?: boolean;
  path: string;
  element: React.ReactNode;
}
export const routes: RouteT[] = [
  {
    index: true,
    path: "dashboard",
    element: (
      <RoleChecker roles={[Roles.ADMIN, Roles.TEACHER]}>
        <Dashboard />
      </RoleChecker>
    ),
  },
  {
    path: "students",
    element: (
      <RoleChecker roles={[Roles.ADMIN, Roles.TEACHER]}>
        <Students />
      </RoleChecker>
    ),
  },
  {
    path: "teachers",
    element: (
      <RoleChecker roles={[Roles.ADMIN]}>
        <Teachers />
      </RoleChecker>
    ),
  },
  {
    path: "groups",
    element: (
      <RoleChecker roles={[Roles.ADMIN, Roles.TEACHER]}>
        <Groups />
      </RoleChecker>
    ),
  },
  {
    path: "profile",
    element: <Profile />,
  },
  { path: "settings", element: <Settings /> },
  { path: "logout", element: <Logout /> },
];

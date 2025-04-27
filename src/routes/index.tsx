import RoleChecker from "../components/RoleChecker";
import Dashboard from "../pages/dashboard";
import Groups from "../pages/groups";
import Logout from "../pages/logout/logout";
import Profile from "../pages/profile";
import Settings from "../pages/settings/settings";
import CreateStudent from "../pages/students/create-student";
import Students from "../pages/students/students";
import CreateTeacher from "../pages/teachers/create-teachers";
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
    path: "create-student",
    element: (
      <RoleChecker roles={[Roles.ADMIN]}>
        <CreateStudent />
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
    path: "create-teacher",
    element: (
      <RoleChecker roles={[Roles.ADMIN]}>
        <CreateTeacher />
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

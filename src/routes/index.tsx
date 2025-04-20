import RoleChecker from "../components/RoleChecker";
import Dashboard from "../pages/dashboard";
import Groups from "../pages/groups";
import Profile from "../pages/profile";

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
    path: "groups",
    element: (
      <RoleChecker roles={[Roles.ADMIN, Roles.TEACHER]}>
        <Groups />
      </RoleChecker>
    ),
  },
  {
    path: "profile",
    element: (
      <RoleChecker roles={[Roles.ADMIN, Roles.TEACHER]}>
        <Profile />
      </RoleChecker>
    ),
  },
];

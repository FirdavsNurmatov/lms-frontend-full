import RoleChecker from "../components/RoleChecker";
import { RouteT, ROLES } from "../config";
import Dashboard from "../pages/dashboard/dashboard";
import CreateGroup from "../pages/groups/create-group";
import Groups from "../pages/groups/group";
import Logout from "../pages/logout/logout";
import Profile from "../pages/profile/profile";
import Settings from "../pages/settings/settings";
import CreateStudent from "../pages/students/create-student";
import Students from "../pages/students/students";
import CreateTeacher from "../pages/teachers/create-teachers";
import Teachers from "../pages/teachers/teachers";


export const routes: RouteT[] = [
  {
    index: true,
    path: "dashboard",
    element: (
      <RoleChecker roles={[ROLES.ADMIN, ROLES.TEACHER]}>
        <Dashboard />
      </RoleChecker>
    ),
  },
  {
    path: "students",
    element: (
      <RoleChecker roles={[ROLES.ADMIN, ROLES.TEACHER]}>
        <Students />
      </RoleChecker>
    ),
  },
  {
    path: "create-student",
    element: (
      <RoleChecker roles={[ROLES.ADMIN]}>
        <CreateStudent />
      </RoleChecker>
    ),
  },
  {
    path: "teachers",
    element: (
      <RoleChecker roles={[ROLES.ADMIN]}>
        <Teachers />
      </RoleChecker>
    ),
  },
  {
    path: "create-teacher",
    element: (
      <RoleChecker roles={[ROLES.ADMIN]}>
        <CreateTeacher />
      </RoleChecker>
    ),
  },
  {
    path: "groups",
    element: (
      <RoleChecker roles={[ROLES.ADMIN, ROLES.TEACHER]}>
        <Groups />
      </RoleChecker>
    ),
  },
   {
    path: 'create-group', element: <RoleChecker roles={[ROLES.ADMIN]}><CreateGroup /></RoleChecker>
  },
  {
    path: "profile",
    element: <Profile />,
  },
  { path: "settings", element: <Settings /> },
  { path: "logout", element: <Logout /> },
];

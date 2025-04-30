import { Gender, Roles, Status } from "./enums";

export interface User {
  user_id: string;
  address: string;
  data_of_birth: string;
  gender: Gender;
  phone_number: string;
  username: string;
  full_name: string;
  email?: string;
  password: string;
  role: Roles;
}

export interface RouteT {
  index?: boolean;
  path: string;
  element: React.ReactNode;
}

export interface Course {
  course_id: string;
  name: string;
  description: string;
  duration: number;
  status: Status.ACTIVE | string;
}

export interface Group {
  group_id: string;
  name: string;
  description: string;
  start_date: string;
  course_id: string;
  teacher_id: string;
  course: Course;
  teacher: User;
  group_members: [];
}

export interface DataT {
  user: UserT;
  token: string | null;
  setUser: (user: UserT) => void;
  setToken: (token: string) => void;
}

export interface UserT {
  full_name?: string;
  username?: string;
  role?: string;
  user_id?: string;
}

export interface UpdateStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: User;
  onStudentEdited: () => void;
}

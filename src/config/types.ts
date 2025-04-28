import { PaymentType, Roles } from "./enums";

export type LoginFieldType = {
  username: string;
  password: string;
};

export type StudentsFieldType = {
  img_url: string;
  full_name: string;
  username: string;
  password: string;
  gender: Roles;
  address: string;
  groupId: string;
  paymentType: PaymentType;
  sum: number;
  phone_number: string;
  data_of_birth: string;
};

export type TeacherFieldType = {
  img: File;
  first_name: string;
  second_name: string;
  third_name: string;
  birth_date: Date;
  gender: string;
  address: string;
  group_id: string;
  phone_number: string;
};

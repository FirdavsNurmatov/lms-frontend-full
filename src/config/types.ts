import { Gender, PaymentType } from "./enums";

export type LoginFieldType = {
  username: string;
  password: string;
};

export type StudentsFieldType = {
  img_url: string;
  full_name: string;
  username: string;
  password: string;
  gender: Gender;
  address: string;
  groupId: string;
  paymentType: PaymentType;
  sum: number;
  phone_number: string;
  data_of_birth: string;
};

export type TeacherFieldType = {
  img_url: string;
  full_name: string;
  username: string;
  password: string;
  data_of_birth: string;
  gender: Gender;
  address: string;
  phone_number: string;
};

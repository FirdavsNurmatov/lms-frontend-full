export type LoginFieldType = {
  username: string;
  password: string;
};

export type StudentsFieldType = {
  picture: File;
  first_name: string;
  second_name: string;
  third_name: string;
  birth_date: Date;
  gender: string;
  address: string;
  groupNumber: string;
  paymentType: "cart" | "cash";
  payment: string;
  phoneNumber: string;
};

export type TeacherFieldType = {
  picture: File;
  first_name: string;
  second_name: string;
  third_name: string;
  birth_date: Date;
  gender: string;
  address: string;
  groupNumber: string;
  paymentType: "cart" | "cash";
  payment: string;
  phoneNumber: string;
};

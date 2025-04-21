import { Divider, Table } from "antd";
import type { TableColumnsType } from "antd";
import { teacherInstance } from "../../config/axios-instance";
import { Roles } from "../../routes";
import { useEffect, useState } from "react";

interface User {
  user_id: string;
  full_name: string;
  email: string;
  password: string;
  role: Roles;
}

const Dashboard = () => {
  const [teachers, setTeachers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await teacherInstance.get("/user");

        const teachers: User[] = res.data?.data.filter(
          (user: User) => user.role === Roles.TEACHER
        );

        setTeachers(teachers);
        console.log(teachers);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const columns: TableColumnsType<User> = [
    {
      title: "O'qituvchilar F.I.O",
      dataIndex: "full_name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];

  return (
    <>
    <h1>Asosiy bo'lim</h1>
    <hr />
      <Table<User>
        columns={columns}
        rowKey={"user_id"}
        dataSource={teachers}
        size="middle"
      />
    </>
  );
};

export default Dashboard;

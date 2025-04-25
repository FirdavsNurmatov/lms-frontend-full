import { Table, TableColumnsType } from "antd";
import addIcon from "../../assets/svg/addIcon.svg";
import { User } from "../dashboard";
import { useEffect, useState } from "react";
import { teacherInstance } from "../../config/axios-instance";
import { Roles } from "../../routes";

const Teachers = () => {
  const [teachers, setTeachers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await teacherInstance.get("/user");

        const teachers: User[] = res.data?.data.filter(
          (user: User) => user.role === Roles.TEACHER
        );

        setTeachers(teachers);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const columns: TableColumnsType<User> = [
    { title: "O'quvchilar F.I.O", dataIndex: "full_name" },
    { title: "Email", dataIndex: "email" },
  ];

  return (
    <div>
      <div className="teachers_block">
        <p className="teachers_title">O'qituvchilar jadvali</p>
        <div>
          <button className="add_button">
            <img src={addIcon} alt="qo'shish" />
            <p>Qo'shish</p>
          </button>
        </div>
      </div>
      <div className="teachers_table">
        <Table<User> rowKey="user_id" columns={columns} dataSource={teachers} />
      </div>
    </div>
  );
};

export default Teachers;

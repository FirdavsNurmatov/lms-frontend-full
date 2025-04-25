import { Table } from "antd";
import type { TableColumnsType } from "antd";
import addIcon from "../../assets/svg/addIcon.svg";
import { teacherInstance } from "../../config/axios-instance";
import { useEffect, useState } from "react";
import { User } from "../dashboard";
import { Roles } from "../../routes";
import { useNavigate } from "react-router-dom";

// interface DataType {
//   key: string;
//   name: string;
//   age: number;
//   address: string;
//   tags: string[];
// }

const Students = () => {
  const navigate = useNavigate();
  const [students, setTeachers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await teacherInstance.get("/user");

        const students: User[] = res.data?.data.filter(
          (user: User) => user.role === Roles.STUDENT
        );

        setTeachers(students);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const columns: TableColumnsType<User> = [
    { title: "O'quvchilar F.I.O", dataIndex: "full_name" },
    {
      title: "Email",
      dataIndex: "email",
    },

    // {
    //   title: "Name",
    //   dataIndex: "name",
    //   key: "name",
    //   render: (text) => <a>{text}</a>,
    // },
    // {
    //   title: "Age",
    //   dataIndex: "age",
    //   key: "age",
    // },
    // {
    //   title: "Address",
    //   dataIndex: "address",
    //   key: "address",
    // },
    // {
    //   title: "Tags",
    //   key: "tags",
    //   dataIndex: "tags",
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a>Invite {record.name}</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];

  const navigateTo = () => {
    console.log("ok");

    return navigate("/app/create-student");
  };

  return (
    <div>
      <div className="students_block">
        <p className="students_title">O'quvchilar jadvali</p>
        <div>
          <button onClick={navigateTo} className="add_button">
            <img src={addIcon} alt="qo'shish" />
            <p>Qo'shish</p>
          </button>
        </div>
      </div>
      <div className="students_table">
        <Table<User> rowKey="user_id" columns={columns} dataSource={students} />
      </div>
    </div>
  );
};

export default Students;

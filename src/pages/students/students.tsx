import { Table } from "antd";
import type { TableColumnsType } from "antd";
import addIcon from "../../assets/svg/addIcon.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import updateIcon from '../../assets/svg/updateIcon.svg'
import deleteIcon from '../../assets/svg/deleteIcon.svg'
import { GENDER, ROLES, teacherInstance, User } from "../../config";

const Students = () => {
  const navigate = useNavigate();
  const [students, setTeachers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await teacherInstance.get("/user");

        const students: User[] = res.data?.data.filter(
          (user: User) => user.role === ROLES.STUDENT
        );

        setTeachers(students);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const columns: TableColumnsType<User> = [
    { title: '#', render: (_, record, index) => index + 1 }, {
      title: "O'qituvchilar F.I.O",
      dataIndex: "full_name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    { title: "Tug'ilgan sana", dataIndex: 'data_of_birth', render: (val) => val ? val.split('T')[0] : '-' },
    {
      title: 'Jinsi',
      dataIndex: 'gender',
      render: (val) => val === GENDER.MALE ? <p className="gender_male">O'gil bola</p> : val === GENDER.FEMALE ? <p className="gender_female">Qiz bola</p> : '-'
    },
    {
      title: 'Kontakt',
      dataIndex: 'phone_number',
      render: (val) => val ? val : '-'
    },
    {
      title: 'Imkoniyatlar',
      render: (_, record, index) =>
        <div className="actions_block">
          <button className="update_btn" id={record?.user_id || ''}>
            <img src={updateIcon} alt="o'zgartirish" />
          </button>
          <button className="delete_btn" id={record?.user_id || ''}>
            <img src={deleteIcon} alt="o'chirish" />
          </button>
        </div>
    }
  ];

  const navigateTo = () => {
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

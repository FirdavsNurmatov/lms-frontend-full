import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableColumnsType } from "antd";
import addIcon from "../../assets/svg/addIcon.svg";
import updateIcon from '../../assets/svg/updateIcon.svg'
import deleteIcon from '../../assets/svg/deleteIcon.svg'
import { Gender, Roles, teacherInstance, User } from "../../config";

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
      render: (val) => val === Gender.MALE ? <p className="gender_male">O'gil bola</p> : val === Gender.FEMALE ? <p className="gender_female">Qiz bola</p> : '-'
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


  const navigate = useNavigate()
  const navigateTo = () => {
    return navigate("/app/create-teacher");
  };

  return (
    <div>
      <div className="teachers_block">
        <p className="teachers_title">O'qituvchilar jadvali</p>
        <div>
          <button onClick={navigateTo} className="add_button">
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

import { useEffect, useState } from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import EChartsReact from "echarts-for-react";
import { GENDER, ROLES, teacherInstance, User } from "../../config";

const Dashboard = () => {
  const [teachers, setTeachers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await teacherInstance.get("/user");

        const teachers: User[] = res.data?.data.filter(
          (user: User) => user.role === ROLES.TEACHER
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
      render: (val) => val === GENDER.MALE ? <p className="gender_male">O'gil bola</p> : val === GENDER.FEMALE ? <p className="gender_female">Qiz bola</p> : '-'
    },
    {
      title: 'Kontakt',
      dataIndex: 'phone_number',
      render: (val) => val ? val : '-'
    }
  ];

  const option = {
    // title: {
    // text: 'A Case of Doughnut Chart',
    //   left: 'center',
    //   top: 'center'
    // },
    series: [
      {
        type: 'pie',
        data: [
          {
            value: 335,
            name: 'A'
          },
          {
            value: 234,
            name: 'B'
          },
          {
            value: 1548,
            name: 'C'
          }
        ],
        radius: ['40%', '70%']
      }
    ]
  };

  return (
    <>
      <div className="dashboard__title">
        <h1>Asosiy bo'lim</h1>
      </div>
      <div className="data_display_block">
        <div>
          <div className="top_block">
            <p className="top_block__title">
              O'qituvhilar soni: {teachers.length} ta
            </p>
          </div>
          <Table<User>
            columns={columns}
            rowKey={"user_id"}
            dataSource={teachers}
            // size="middle"
            pagination={{ pageSize: 3 }}
          />
        </div>
        <div className="bottom_block">
          <div className="left_block">
            <Table<User>
              columns={columns}
              rowKey={"user_id"}
              dataSource={teachers}
              pagination={{ pageSize: 3 }}
            />
          </div>
          <div className="statistics_block">
            <div className="statistic_top_block">
              <p className="statistic_title">
                Bolalarni yosh bo'yicha statistikasi
              </p>
              <p className="statistic_percentage">100%</p>
            </div>
            <div className="statistic_diagramm">
              <EChartsReact option={option} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

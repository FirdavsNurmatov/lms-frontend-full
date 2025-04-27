import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { teacherInstance } from "../../config/axios-instance";
import { Roles } from "../../routes";
import { useEffect, useState } from "react";
import EChartsReact from "echarts-for-react";

export interface User {
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

  // const data = [
  //   { type: "0-1", value: 40 },
  //   { type: "1-2", value: 24 },
  //   { type: "2-3", value: 12 },
  //   { type: "3-4", value: 10 },
  //   { type: "4-5", value: 8 },
  //   { type: "5-6", value: 4 },
  //   { type: "6-7", value: 2 },
  // ];

const  option = {
    series: [
      {
        type: "pie",
        data: [
          {
            value: 335,
            name: "Direct Visit",
          },
          {
            value: 234,
            name: "Union Ad",
          },
          {
            value: 1548,
            name: "Search Engine",
          },
        ],
      },
    ],
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
              {/* <EChartsReact option={option}/> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

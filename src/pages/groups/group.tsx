import { Table, TableColumnsType, } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import addIcon from "../../assets/svg/addIcon.svg";
import updateIcon from '../../assets/svg/updateIcon.svg'
import deleteIcon from '../../assets/svg/deleteIcon.svg'
import { adminInstance, Group } from "../../config";

const Groups = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await adminInstance.get("/groups");
        const groups: Group[] = res?.data?.data

        setGroups(groups);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);


  const columns: TableColumnsType<Group> = [
    { title: '#', render: (_, record, index) => index + 1 },
    { title: 'Nomi', dataIndex: 'name' },
    { title: 'Boshlangan sana', dataIndex: 'start_date' },
    {
      title: "Daraja", dataIndex: 'description'
    },
    {
      title: 'Imkoniyatlar',
      render: (_, record, index) =>
        <div className="actions_block">
          <button className="update_btn" id={record?.group_id || ''}>
            <img src={updateIcon} alt="o'zgartirish" />
          </button>
          <button className="delete_btn" id={record?.group_id || ''}>
            <img src={deleteIcon} alt="o'chirish" />
          </button>
        </div>
    }
  ];

  const navigateTo = () => {
    return navigate("/app/create-group");
  };


  return (
    <div>
      <div className="groups_block">
        <p className="groups_title">Guruhlar jadvali</p>
        <div>
          <button onClick={navigateTo} className="add_button">
            <img src={addIcon} alt="qo'shish" />
            <p>
              Qo'shish
            </p>
          </button>
        </div>
      </div>
      <div className="groups_table">
        <Table<Group> rowKey='group_id' columns={columns} dataSource={groups} />
      </div>
    </div>
  );
};

export default Groups;

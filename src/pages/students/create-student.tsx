import {
  Button,
  DatePicker,
  Form,
  FormProps,
  Input,
  Select,
  Upload,
} from "antd";
import saveIcon from "../../assets/svg/saveIcon.svg";
import cancelIcon from "../../assets/svg/cancelIcon.svg";
import uploadImageIcon from "../../assets/svg/uploadImageIcon.svg";
import { useNavigate } from "react-router-dom";
import { adminInstance, Gender, Group, PaymentType, StudentsFieldType } from "../../config";
import { useEffect, useState } from "react";
import dayjs from 'dayjs'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const CreateStudent = () => {
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  // const createStudent = useEffect(() => {
  // }, [])

  const [groups, setGroups] = useState<Group[]>([])
  useEffect(() => {
    const getGroups = async () => {
      try {
        const res = await adminInstance.get("/groups");

        setGroups(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getGroups();
  }, [])


  const onFinish: FormProps<StudentsFieldType>["onFinish"] = async (data) => {
    try {
      let obj = { ...data }
      obj.sum = +data.sum
      obj.data_of_birth = dayjs(data.data_of_birth).format('YYYY-MM-DD')
      // @ts-ignore
      obj.img_url = data.img_url?.[0]?.name

      toast.loading('Yaratilmoqda...', { autoClose: 3000 })
      const res = await adminInstance.post('/students', obj)

      if (res?.status == 201) {
        toast.success("O'qituvchi muvaffaqiyatli yaratildi")
        setTimeout(() => {
          navigate('/app/students', { replace: true })
        }, 3000);
      } else {
        toast.error("Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.");
      }
    } catch (error) {
      toast.error("Server bilan bog‘lanishda xatolik.");
      console.error(error);
    }
  };

  const onFinishFailed: FormProps<StudentsFieldType>["onFinishFailed"] = (data) => {
    console.log("cancelling", data);
  };

  const navigate = useNavigate()

  const navigateTo = () => {
    return navigate(-1)
  }

  if (!groups || groups.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{ gender: Gender.MALE, groupId: groups?.[0]?.group_id ?? null, paymentType: PaymentType.CASH }}
      >
        <div className="students_block">
          <p className="students_title">O'quvchilar jadvali</p>
          <div className="create_buttons">
            <Button onClick={navigateTo} className="add_button">
              <img src={cancelIcon} alt="bekor qilish" />
              <p>Bekor qilish</p>
            </Button>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="add_button">
                <img src={saveIcon} alt="saqlash" />
                <p>Saqlash</p>
              </Button>
            </Form.Item>
          </div>
        </div>
        <div className="form_create">
          <div className="first_row">
            <div className="upload_img">
              <Form.Item
                label="Rasm:"
                name="img_url"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: 'Iltimos rasmingizni yuklang!' }]}
              >
                <Upload
                  action="/upload.do"
                  listType="picture-card"
                >
                  <button
                    className="upload_img_btn"
                    type="button"
                    style={{
                      color: "inherit",
                      cursor: "inherit",
                      border: 0,
                      background: "none",
                    }}
                  >
                    <img src={uploadImageIcon} alt="rasm" />
                    <div style={{ marginTop: 8 }}>Rasmni yuklang</div>
                  </button>
                </Upload>
              </Form.Item>
            </div>
            <div className="right_inputs">
              <div className="first_row_upper_block">
                <Form.Item name="full_name" label="F.I.O:" rules={[{ required: true, message: 'Iltimos F.I.O yingizni kiriting!' }]}>
                  <Input placeholder="Laziz Bekmirzayev Azamovich" />
                </Form.Item>
                <Form.Item name="username" label="Username:" rules={[{ required: true, message: 'Iltimos username kiriting!' }]}>
                  <Input placeholder="Laziz007" />
                </Form.Item>
                <Form.Item name="password" label="Parol:" rules={[{ required: true, message: 'Iltimos parol kiriting!' }, {
                  validator: (_, value) => {
                    if (!value) return Promise.resolve();

                    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
                    return strongPasswordRegex.test(value)
                      ? Promise.resolve()
                      : Promise.reject(
                        new Error('Parol kamida 8 ta belgidan iborat bo‘lishi, katta harf, kichik harf, raqam va maxsus belgi o‘z ichiga olishi kerak.')
                      );
                  },
                }]}>
                  <Input placeholder="Killer$%02" />
                </Form.Item>
              </div>
              <div className="first_row_bottom_block">
                <Form.Item name="data_of_birth" label="Tug'ilgan sana:" rules={[{ required: true, message: "Iltimos tug'ilgan kuningizni tanlang!" }]}>
                  <DatePicker />
                </Form.Item>
                <Form.Item name="gender" label="Jinsi:">
                  <Select>
                    <Select.Option value={Gender.MALE} >O'gil bola</Select.Option>
                    <Select.Option value={Gender.FEMALE}>Qiz bola</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item name="address" label="Yashash manzili:" rules={[{ required: true, message: 'Iltimos yashash manzilinigizni kiriting!' }]}>
                  <Input placeholder="Toshkent, Qibray, Bunyodkor mahallaai, 45-uy" />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="second_row">
            <Form.Item name="groupId" label="Guruhlar:">
              <Select>
                {groups ? groups.map((val) => <Select.Option key={val.group_id} value={val.group_id}>{val.name}</Select.Option>) : null}
              </Select>
            </Form.Item>
            <Form.Item name="paymentType" label="To'lov turi:">
              <Select>
                <Select.Option value={PaymentType.CASH}>Naqd</Select.Option>
                <Select.Option value={PaymentType.CREDIT_CARD}>Karta</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="sum" label="Summa:" rules={[{ required: true, message: 'Iltimos summani kiriting!' }, {
              pattern: /^(0|[1-9]\d*)$/, message: "Bosh raqami 0 bilan boshlanmaydigan raqam kiriting!"
            },]}>
              <Input placeholder="1000" />
            </Form.Item>
            <Form.Item name="phone_number" label="Telefon raqami:" rules={[{ required: true, message: 'Iltimos telefon raqamini kiriting!' }, { pattern: /^\+998[0-9]{9}$/, message: "Oxirigacha kiriting yoki mavjud bo'lmagan telefon raqam!" },]}>
              <Input placeholder="+998991234567" />
            </Form.Item>
          </div>
        </div>
      </Form>
    </>
  );
};

export default CreateStudent;

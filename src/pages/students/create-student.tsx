import { PlusOutlined } from "@ant-design/icons";
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

type FieldType = {
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

const CreateStudent = () => {
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (data) => {
    console.log("creating", data);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (data) => {
    console.log("cancelling", data);
  };

  return (
    <>
      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      // wrapperCol={{ span: 18 }}
      >
        <div className="students_block">
          <p className="students_title">O'quvchilar jadvali</p>
          <div className="create_buttons">
            <Form.Item>
              <Button type="primary" htmlType="submit" className="add_button">
                <img src={cancelIcon} alt="bekor qilish" />
                <p>Bekor qilish</p>
              </Button>
            </Form.Item>
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
            <Form.Item
              label="Rasm:"
              name="picture"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                action="/upload.do"
                listType="picture-card"
                className="upload_picture"
                style={{ width: 150, height: 150 }}
              >
                <button
                  className="upload_picture"
                  style={{
                    color: "inherit",
                    cursor: "inherit",
                    border: 0,
                    background: "none",
                  }}
                  type="button"
                >
                  {/* <PlusOutlined /> */}
                  <img src={uploadImageIcon} alt="rasm" />
                  <div style={{ marginTop: 8 }}>Rasmni yuklang</div>
                </button>
              </Upload>
            </Form.Item>
            <div className="right_inputs">
              <div className="first_row_upper_block">
                <Form.Item name="firstName" label="Ism:">
                  <Input />
                </Form.Item>
                <Form.Item name="secondName" label="Familiya:">
                  <Input />
                </Form.Item>
                <Form.Item name="thirdName" label="Sharfi:">
                  <Input />
                </Form.Item>
              </div>
              <div className="first_row_bottom_block">
                <Form.Item name="birth_date" label="Tug'ilgan sana:">
                  <DatePicker />
                </Form.Item>
                <Form.Item name="gender" label="Jinsi:">
                  <Select>
                    <Select.Option value="demo">Demo</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item name="address" label="Yashash manzili:">
                  <Input />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="second_row">
            <Form.Item name="groupNumber" label="Gurux raqami">
              <Select>
                {/* <Select.Option value="demo">Demo</Select.Option> */}
              </Select>
            </Form.Item>
            <Form.Item name="paymentType" label="To'lov">
              <Select>
                <Select.Option value="cash">Naqd</Select.Option>
                <Select.Option value="cart">Karta</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="payment" label="To'lov summa">
              <Input />
            </Form.Item>
            <Form.Item name="phoneNumber" label="Telefon:">
              <Input />
            </Form.Item>
          </div>
        </div>
      </Form>
    </>
  );
};

export default CreateStudent;

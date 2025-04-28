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
import { TeacherFieldType } from "../../config";


const CreateTeacher = () => {
    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    // const createTeacher = useEffect(() => {
    // }, [])

    // useEffect(() => {
    //     const getGroups = async () => {
    //         try {
    //             const res = await adminInstance.get("/groups");

    //             console.log(res);

    //             // setState(res.data?.);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     getGroups();
    // }, [])

    const onFinish: FormProps<TeacherFieldType>["onFinish"] = (data) => {
        console.log("creating", data);
    };

    const onFinishFailed: FormProps<TeacherFieldType>["onFinishFailed"] = (data) => {
        console.log("cancelling", data);
    };

    const navigate = useNavigate()

    const navigateTo = () => {
        return navigate(-1)
    }

    return (
        <>
            <Form
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            // wrapperCol={{ span: 18 }}
            >
                <div className="students_block">
                    <p className="students_title">O'qituvchilar jadvali</p>
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
                        <Form.Item
                            label="Rasm:"
                            name="picture"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                        >
                            <Upload
                                action="/upload.do"
                                listType="picture-card"
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
                                    <img src={uploadImageIcon} alt="rasm"
                                    />
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
                                        <Select.Option value="male" >O'gil bola</Select.Option>
                                        <Select.Option value="female">Qiz bola</Select.Option>
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
                        <Form.Item name="phoneNumber" label="Telefon:">
                            <Input />
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </>
    );
};

export default CreateTeacher;

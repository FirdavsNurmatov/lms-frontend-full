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
import { adminInstance, Gender, TeacherFieldType } from "../../config";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const CreateTeacher = () => {
    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const onFinish: FormProps<TeacherFieldType>["onFinish"] = async (data) => {
        try {
            let obj = { ...data }
            obj.data_of_birth = dayjs(data.data_of_birth).format('YYYY-MM-DD')
            // @ts-ignore
            obj.img_url = data.img_url?.[0]?.name

            toast.loading('Yaratilmoqda...')
            const res = await adminInstance.post('/teacher/createTeacher', obj)

            if (res?.status == 201) {
                toast.success("O'qituvchi muvaffaqiyatli yaratildi")
                setTimeout(() => {
                    navigate('/app/teachers', { replace: true })
                }, 3000);
            } else {
                toast.error("Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.");
            }
        } catch (error) {
            toast.error("Server bilan bog‘lanishda xatolik.");
            console.error(error);
        }
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
            <ToastContainer position="top-right" autoClose={3000} />
            <Form
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{ gender: Gender.MALE }}
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
                            name="img_url"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            rules={[{ required: true, message: "Rasmni yuklang!" }]}
                        >
                            <Upload
                                action="/upload.do"
                                listType="picture-card"
                            >
                                <button
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
                                <Form.Item name="full_name" label="F.I.O:" rules={[{ required: true, message: "F.I.O yingizni kiriting!" }]}>
                                    <Input placeholder="Laziz Bekmirzayev Azamovich" />
                                </Form.Item>
                                <Form.Item name="username" label="Username:" rules={[{ required: true, message: "Username kiriting!" }]}>
                                    <Input placeholder="Laziz007" />
                                </Form.Item>
                                <Form.Item name="password" label="Parol:" rules={[{ required: true, message: 'Parolni kiriting!' }, {
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
                                <Form.Item name="data_of_birth" label="Tug'ilgan sana:" rules={[{ required: true, message: "Tug'ilgan sanangizni kiriting!" }]}>
                                    <DatePicker />
                                </Form.Item>
                                <Form.Item name="gender" label="Jinsi:">
                                    <Select>
                                        <Select.Option value={Gender.MALE} >O'g'il bola</Select.Option>
                                        <Select.Option value={Gender.FEMALE}>Qiz bola</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item name="address" label="Yashash manzili:" rules={[{ required: true, message: "Yashash manzilingizni kiriting!" }]}>
                                    <Input placeholder="Toshkent, Qibray, Bunyodkor mahallaai, 45-uy" />
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                    <div className="second_row">
                        <Form.Item name="phone_number" label="Telefon:" rules={[{ required: true, message: "Telefon raqamingizni kiriting!" }, { pattern: /^\+998[0-9]{9}$/, message: "Oxirigacha kiriting yoki mavjud bo'lmagan telefon raqam!" }]}>
                            <Input placeholder="+998991234567" />
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </>
    );
};

export default CreateTeacher;

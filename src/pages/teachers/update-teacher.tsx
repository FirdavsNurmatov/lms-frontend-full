import { DatePicker, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { adminInstance, StudentsFieldType, User } from '../../config';
import dayjs from 'dayjs';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const UpdateTeacher = ({ icon, userData }: { icon: string, userData: User }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
        form.setFieldsValue({
            full_name: userData.full_name,
            username: userData.username,
            data_of_birth: dayjs(userData.data_of_birth),
            address: userData.address,
            phone_number: userData.phone_number
        });
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const handleFinish = async (values: StudentsFieldType) => {
        try {
            values.data_of_birth = dayjs(userData.data_of_birth).format('YYYY-MM-DD')
            const res = await adminInstance.patch(`/teachers/${userData.user_id}`, { ...values })
            if (res.data.status == 200) {
                toast.success("O'quvchi muvaffaqiyatli yangilandi", { autoClose: 3000 })
            } else {
                toast.error('Xatolik yuz berdi!', { autoClose: 3000 })
            }
        } catch (error) {
            console.log("xatolik", error);
        }
        setIsModalOpen(false);
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <button className="update_btn" onClick={showModal}>
                <img src={icon} alt="o'zgartirish" />
            </button>
            <Modal
                title="O'qituvchini tahrirlash"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <Form.Item name="full_name" label="F.I.O:"><Input /></Form.Item>
                    <Form.Item name="username" label="Username:"><Input /></Form.Item>
                    <Form.Item name="data_of_birth" label="Tug‘ilgan sana:">
                        <DatePicker className="edit-student-modal-datepicker" />
                    </Form.Item>
                    <Form.Item name="address" label="Yashash manzili:"><Input /></Form.Item>
                    <Form.Item name="phone_number" label="Telefon raqami:"><Input /></Form.Item>

                    <div className="edit-student-modal-footer" style={{ display: 'flex', justifyContent: 'end', gap: '10px' }}>
                        <button type="button" onClick={handleCancel} className="cancel_btn">Bekor qilish</button>
                        <button type="submit" className="save_btn">Saqlash</button>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default UpdateTeacher;

import { useAuthStore } from "../../store/useAuthStore";
import { instance } from "../../config/axios-instance";
import { Button, Form, FormProps, Input } from "antd";

const Login = () => {
  type FieldType = {
    login?: string;
    password?: string;
  };

  const { user, setUser, setToken, token } = useAuthStore((store) => store);
  const loginHandler = async () => {
    const res = await instance.post("/auth/login", {
      username: "johndoe",
      password: "password123",
    });
    console.log(res);

    setUser(res.data.user);
    setToken(res.data.data.accessToken);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const { login, password } = values;
    if (login && password) {
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <p>Login</p>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name={"username"}
          rules={[{ required: true, message: "Iltimos username kiriting!" }]}
        >
          <Input placeholder="Login" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Iltimos parolni kiriting!" }]}
        >
          <Input.Password
            name="Parol"
            style={{
              fontSize: "14px",
              padding: "2px",
            }}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Kirish
        </Button>
      </Form>
      {/* {token ? (
        <p>{user.full_name}</p>
      ) : (
        <button onClick={loginHandler}>Login</button>
      )}
      <Link to="/dashboard">Dashboard</Link> */}
    </div>
  );
};

export default Login;

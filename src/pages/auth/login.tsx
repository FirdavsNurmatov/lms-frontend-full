import { useAuthStore } from "../../store/useAuthStore";
import { adminInstance } from "../../config/axios-instance";
import { Button, Form, FormProps, Input } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  type FieldType = {
    username?: string;
    password?: string;
  };
  const navigate = useNavigate();

  const { user, setUser, setToken, token } = useAuthStore((store) => store);
  if (token) {
    navigate("/app/dashboard", { replace: true });
  }

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { username, password } = values;
    if (username && password) {
      const res = await adminInstance.post("/auth/login", {
        username: username,
        password: password,
      });
      setUser(res.data.user);
      setToken(res.data.data.accessToken);

      navigate("/dashboard", { replace: true });
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container">
      <div className="login__block">
        <p className="login__title">Tizimga kirish</p>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="true"
        >
          <Form.Item
            name={"username"}
            rules={[{ required: true, message: "Iltimos username kiriting!" }]}
          >
            <Input
              name="username"
              placeholder="Username"
              style={{
                fontSize: "18px",
                padding: "4px",
              }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Iltimos parolni kiriting!" }]}
          >
            <Input.Password
              name="password"
              placeholder="Parol"
              style={{
                fontSize: "18px",
                padding: "4px",
              }}
            />
          </Form.Item>
          <Button
            type="primary"
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "20px",
              fontSize: "18px",
            }}
            htmlType="submit"
          >
            Kirish
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;

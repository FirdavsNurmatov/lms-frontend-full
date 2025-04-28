import { useAuthStore } from "../../store/useAuthStore";
import { Button, Form, FormProps, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { adminInstance, LoginFieldType } from "../../config";
import { useEffect, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setToken, token } = useAuthStore((store) => store);
  useEffect(
    () => {
      if (token) {
        navigate("/app/dashboard", { replace: true });
      }
    }, [token]
  )

  const [error, setError] = useState('')

  const onFinish: FormProps<LoginFieldType>["onFinish"] = async (values) => {
    const { username, password } = values;
    if (username && password) {
      try {
        const res = await adminInstance.post("/auth/login", {
          username: username,
          password: password,
        });
        setUser(res.data.user);
        setToken(res.data.data.accessToken);

        navigate("/dashboard", { replace: true });
      } catch (err) {
        setError('Username yoki parol xato!')
      }
    }
  };

  return (
    <div className="container">
      <div className="login__block">
        <p className="login__title">Tizimga kirish</p>
        <Form
          name="basic"
          onFinish={onFinish}
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
          {error ? <p className="login_error">{error}</p> : <p></p>}
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

import { useAuthStore } from "../../store/useAuthStore";
import { Button, Form, FormProps, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { adminInstance, LoginFieldType } from "../../config";
import { useState } from "react";
import Cookies from "js-cookie";


const Login = () => {
  const navigate = useNavigate();
  const { setUser, setToken, token } = useAuthStore((store) => store);

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


        const accessToken = res?.data?.data?.accessToken
        const accessTokenTime = res?.data?.data?.access_token_expire
        Cookies.set('accessToken', accessToken, { secure: true, sameSite: 'strict', expires: +accessTokenTime })

        const refreshToken = res?.data?.data?.refreshToken
        const refreshTokenTime = res?.data?.data?.refresh_token_expire
        Cookies.set('refreshToken', refreshToken, { secure: true, sameSite: 'strict', expires: +refreshTokenTime })

        navigate("/app/dashboard", { replace: true });
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

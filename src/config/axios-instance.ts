import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import Cookie from "js-cookie";

// Admin
export const adminInstance = axios.create({
  baseURL: "https://api.admin.bekzodjon.uz/api/v1",
  // withCredentials: true,
});

adminInstance.interceptors.request.use(async (config) => {
  if (config.url !== "/auth/refresh") {
    const data = await JSON.parse(localStorage.getItem("auth")||'{}');
    const token = data?.state?.token;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
});

const refreshAdminAuthLogic = async (failedRequest: {
  response: { config: { headers: { [x: string]: string } } };
}) => {
  try {
    const response = await adminInstance.post("/auth/refresh", null, {
      headers: { Authorization: `Bearer ${Cookie.get("accessToken")}` },
    });
    const newAccessToken = response.data.accessToken;
    Cookie.set("accessToken", newAccessToken);
    failedRequest.response.config.headers[
      "Authorization"
    ] = `Bearer ${newAccessToken}`;
    return await Promise.resolve();
  } catch (err) {
    Cookie.remove("accessToken");
    Cookie.remove("refreshToken");
    console.error("Error refreshing access token:", err);
    window.location.href = "/login";
    return await Promise.reject(err);
  }
};

createAuthRefreshInterceptor(adminInstance, refreshAdminAuthLogic, {
  statusCodes: [401],
});

// Teacher
export const teacherInstance = axios.create({
  baseURL: "https://api.bekzodjon.uz/api/v1",
  // withCredentials: true,
});

teacherInstance.interceptors.request.use((config) => {
  if (config.url !== "/auth/refresh") {
    const accessToken = Cookie.get("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
  }
  return config;
});

const refreshTeacherAuthLogic = async (failedRequest: {
  response: { config: { headers: { [x: string]: string } } };
}) => {
  try {
    const response = await teacherInstance.post("/auth/refresh", null, {
      headers: { Authorization: `Bearer ${Cookie.get("accessToken")}` },
    });
    const newAccessToken = response.data.accessToken;
    Cookie.set("accessToken", newAccessToken);
    failedRequest.response.config.headers[
      "Authorization"
    ] = `Bearer ${newAccessToken}`;
    return await Promise.resolve();
  } catch (err) {
    Cookie.remove("accessToken");
    Cookie.remove("refreshToken");
    console.error("Error refreshing access token:", err);
    window.location.href = "/login";
    return await Promise.reject(err);
  }
};

createAuthRefreshInterceptor(teacherInstance, refreshTeacherAuthLogic, {
  statusCodes: [401],
});

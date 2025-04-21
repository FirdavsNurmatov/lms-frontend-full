import axios from "axios";
import Cookie from "js-cookie";
import createAuthRefreshInterceptor from "axios-auth-refresh";

// Admin
export const adminInstance = axios.create({
  baseURL: "http://13.233.2.40:4000/api/v1",
  // withCredentials: true,
});

adminInstance.interceptors.request.use((config) => {
  if (config.url !== "/auth/refresh") {
    const accessToken = Cookie.get("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
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

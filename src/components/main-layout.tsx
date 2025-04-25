import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import logoSvg from "../assets/svg/logo.svg";
import dashboardIcon from "../assets/svg/dashboardIcon.svg";
import studentsIcon from "../assets/svg/studentsIcon.svg";
import teachersIcon from "../assets/svg/teachersIcon.svg";
import groupsIcon from "../assets/svg/groupsIcon.svg";
import settingsIcon from "../assets/svg/settingsIcon.svg";
import logoutIcon from "../assets/svg/logoutIcon.svg";
import searchIcon from "../assets/svg/searchIcon.svg";
import React from "react";
import profileIcon from "../assets/svg/profileIcon.svg";
import { useAuthStore } from "../store/useAuthStore";

const MainLayout = () => {
  const { Header, Sider, Content } = Layout;

  const { user } = useAuthStore((store) => store);

  const search = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target?.value);
  };

  return (
    <Layout style={{ height: "100vh", width: "100vw" }}>
      <Sider className="slider_menu">
        <div className="menus">
          <div>
            <div className="logo">
              <img src={logoSvg} alt="logo" />
            </div>
            <Menu
              className="menu_1"
              mode="inline"
              defaultSelectedKeys={["dashboard"]}
              items={[
                {
                  key: "dashboard",
                  icon: <img src={dashboardIcon} alt="asosiy" />,
                  label: <Link to={"/app/dashboard"}>Asosiy</Link>,
                },
                {
                  key: "students",
                  icon: <img src={studentsIcon} alt="o'quvchilar" />,
                  label: <Link to={"/app/students"}>O'quvchilar</Link>,
                },
                {
                  key: "teachers",
                  icon: <img src={teachersIcon} alt="o'qituvchilar" />,
                  label: <Link to={"/app/teachers"}>O'qituvchilar</Link>,
                },
                {
                  key: "groups",
                  icon: <img src={groupsIcon} alt="groups" />,
                  label: <Link to={"/app/groups"}>Guruhlar</Link>,
                },
                {
                  key: "settings",
                  icon: <img src={settingsIcon} alt="sozlamalar" />,
                  label: <Link to={"/app/settings"}>Sozlamalar</Link>,
                },
                {
                  key: "logout",
                  icon: <img src={logoutIcon} alt="chiqish" />,
                  label: <Link to={"/app/logout"}>Chiqish</Link>,
                },
              ]}
            />
          </div>
        </div>
      </Sider>
      <Layout>
        <Header className="header">
          <form onChange={search}>
            <div className="search_block">
              <img src={searchIcon} alt="icon" />
              <input
                type="text"
                className="search_input"
                placeholder="Qidiruv tizimi..."
              />
            </div>
          </form>
          <div className="about_me">
            <img src={profileIcon} alt="profile" />
            <div className="about_me__info">
              <p className="profile_info_1">{user.full_name}</p>
              <p className="profile_info_2">{user.role}</p>
            </div>
          </div>
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

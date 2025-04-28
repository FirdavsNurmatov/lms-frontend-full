import { Layout, Menu } from "antd";
import { NavLink, Outlet } from "react-router-dom";
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
    <Layout style={{ height: "100dvh", width: "100dvw" }}>
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
                  label: <NavLink to={"/app/dashboard"}>Asosiy</NavLink>,
                },
                {
                  key: "students",
                  icon: <img src={studentsIcon} alt="o'quvchilar" />,
                  label: <NavLink to={"/app/students"}>O'quvchilar</NavLink>,
                },
                {
                  key: "teachers",
                  icon: <img src={teachersIcon} alt="o'qituvchilar" />,
                  label: <NavLink to={"/app/teachers"}>O'qituvchilar</NavLink>,
                },
                {
                  key: "groups",
                  icon: <img src={groupsIcon} alt="groups" />,
                  label: <NavLink to={"/app/groups"}>Guruhlar</NavLink>,
                },
                {
                  key: "settings",
                  icon: <img src={settingsIcon} alt="sozlamalar" />,
                  label: <NavLink to={"/app/settings"}>Sozlamalar</NavLink>,
                },
                {
                  key: "logout",
                  icon: <img src={logoutIcon} alt="chiqish" />,
                  label: <NavLink to={"/app/logout"}>Chiqish</NavLink>,
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

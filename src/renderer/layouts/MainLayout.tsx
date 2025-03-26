import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { routes } from "../routes/config";

const { Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true); // 默认折叠

  // 将路由配置转换为菜单项，过滤掉隐藏的路由
  const menuItems = routes
    .filter((route) => !route.hidden)
    .map((route) => {
      if (route.children) {
        return {
          key: route.path,
          icon: route.icon && <route.icon />,
          label: route.name,
          children: route.children
            .filter((child) => !child.hidden)
            .map((child) => ({
              key: child.path,
              label: child.name,
            })),
        };
      }
      return {
        key: route.path,
        icon: route.icon && <route.icon />,
        label: route.name,
      };
    });

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={200}
        theme="dark"
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ flex: 1 }}
        />
        <div
          style={{
            padding: "16px",
            textAlign: "center",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "#001529",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              color: "#fff",
            }}
          />
        </div>
      </Sider>
      <Layout>
        <Content
          style={{ padding: "24px", minHeight: 280, background: "#fff" }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

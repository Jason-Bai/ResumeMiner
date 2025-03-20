import "antd/dist/reset.css"; // Import Ant Design styles
import React from "react";
import {
  BrowserRouter as Router,
  useRoutes,
  useNavigate,
} from "react-router-dom";
import { Layout, Menu } from "antd";
import routes from "../configs/routes";

const { Sider, Content } = Layout;

const AppRoutes = () => {
  return useRoutes(routes);
};

const Root = () => {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="dark">
        <div
          className="logo"
          style={{
            color: "white",
            padding: "16px",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          ResumeMiner
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/"]}
          onClick={({ key }) => key && navigate(key)}
        >
          <Menu.Item key="/">Home</Menu.Item>
          <Menu.SubMenu title="Settings">
            <Menu.Item key="/settings/prompts">Prompts</Menu.Item>
            <Menu.Item key="/settings/fields">Fields</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Content
          style={{ margin: "16px", padding: "16px", background: "#fff" }}
        >
          <AppRoutes />
        </Content>
      </Layout>
    </Layout>
  );
};

const RootApp = () => (
  <Router>
    <Root />
  </Router>
);

export default RootApp;

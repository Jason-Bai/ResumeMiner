import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import MainLayout from "./layouts/MainLayout";
import { routes, RouteConfig } from "./routes/config";
import "./assets/styles/global.less";

const App: React.FC = () => {
  // 递归渲染路由
  const renderRoutes = (routes: RouteConfig[]) => {
    return routes.map((route) => {
      if (route.children) {
        return (
          <Route key={route.path} path={route.path}>
            {renderRoutes(route.children)}
          </Route>
        );
      }
      return (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      );
    });
  };

  return (
    <HashRouter>
      <ConfigProvider locale={zhCN}>
        <div className="app">
          <Routes>
            <Route element={<MainLayout />}>{renderRoutes(routes)}</Route>
          </Routes>
        </div>
      </ConfigProvider>
    </HashRouter>
  );
};

export default App;

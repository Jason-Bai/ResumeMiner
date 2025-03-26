import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import "./assets/styles/global.less";
import Home from "./pages/Home";
import ResumeList from "./pages/ResumeList";
import ResumeDetail from "./pages/ResumeDetail";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resumes" element={<ResumeList />} />
            <Route path="/resumes/:id" element={<ResumeDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </ConfigProvider>
  );
};

export default App;

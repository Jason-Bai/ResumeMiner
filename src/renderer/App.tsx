import React from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/global.less";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <div className="app">
      <Home />
    </div>
  );
};

// 创建根元素
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

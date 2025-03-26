import React, { useEffect, useState } from "react";
import { Card, Input, Space, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ResumeMinerLogo from "@/renderer/assets/images/resume-miner.png";

const { Search } = Input;

const Home: React.FC = () => {
  const [version, setVersion] = useState<string>("");

  useEffect(() => {
    window.electronAPI.getAppVersion().then((version) => {
      setVersion(version);
    });
  }, [window.electronAPI.getAppVersion]);

  console.log(version);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 版本号显示 */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          color: "#666",
          fontSize: "14px",
        }}
      >
        <p style={{ margin: 0 }}>当前版本：{version}</p>
      </div>

      <div style={{ width: "100%", maxWidth: "800px" }}>
        {/* 项目icon */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <img
            src={ResumeMinerLogo}
            alt="Resume Miner Logo"
            style={{
              width: "200px",
              height: "auto",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          />
        </div>

        {/* 第二部分：搜索区域 */}
        <div style={{ width: "100%" }}>
          <Card style={{ height: "100%" }}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3 style={{ margin: 0 }}>搜索</h3>
                <Button type="primary">高级搜索</Button>
              </div>
              <Search
                placeholder="输入关键词搜索简历"
                allowClear
                enterButton={<SearchOutlined />}
                size="large"
              />
            </Space>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;

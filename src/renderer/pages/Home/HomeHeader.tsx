import React from "react";
import { Card, Input, Space, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ResumeMinerLogo from "@/renderer/assets/images/resume-miner.png";
import { Stage, useHomeContext } from "./HomeContext";
import AdvancedSearch from "./components/AdvancedSearch";

const { Search } = Input;

const HomeHeader: React.FC = () => {
  const {
    stage,
    setStage,
    setSearchParams,
    searchBaseParams,
    setSearchBaseParams,
    showAdvancedSearch,
    setShowAdvancedSearch,
  } = useHomeContext();

  const handleSearchClick = () => {
    if (!searchBaseParams.name || !searchBaseParams.name.length) return;
    setSearchParams({
      ...searchBaseParams,
    });
    setStage(Stage.Show_Result);
  };

  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      {/* 项目icon */}
      {stage === Stage.Search && (
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
      )}

      {/* 搜索区域 - 移除边框 */}
      <Card
        style={{
          height: "100%",
          marginTop: stage === Stage.Search ? "0" : "24px",
          boxShadow: "none",
        }}
        bordered={false}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3 style={{ margin: 0 }}>搜索</h3>
            </div>
            <Search
              value={searchBaseParams.name}
              placeholder="输入关键词搜索简历"
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearchClick} // 点击搜索时也隐藏图标
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchBaseParams({
                  ...searchBaseParams,
                  name: e.target.value,
                });

                // 用户清空搜索框，则重置搜索条件
                if (!e.target.value.length) {
                  const resetSearchParams = {
                    name: "",
                    gender: "",
                    skills: [],
                  };
                  setSearchBaseParams(resetSearchParams);
                  setSearchParams(resetSearchParams);
                }
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 16, justifyContent: "flex-end" }}>
            <Button
              style={{ borderRadius: "6px" }}
              onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
            >
              高级搜索
            </Button>
            <Button type="primary" style={{ borderRadius: "6px" }}>
              简历上传
            </Button>
          </div>
          {showAdvancedSearch && <AdvancedSearch />}
        </Space>
      </Card>
    </div>
  );
};

export default HomeHeader;

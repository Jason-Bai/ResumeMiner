import React from "react";
import { Card, Row, Col, Statistic, Input, Space, Button } from "antd";
import { useNavigate } from "react-router-dom";
import {
  FileTextOutlined,
  TeamOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Search } = Input;

const Home: React.FC = () => {
  const navigate = useNavigate();

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
      <div style={{ width: "100%", maxWidth: "800px" }}>
        {/* 第一部分：统计数据 */}
        <div style={{ width: "80%", margin: "0 auto 16px" }}>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card onClick={() => navigate("/resumes/list")}>
                <Statistic
                  title="简历总数"
                  value={100}
                  prefix={<FileTextOutlined />}
                  style={{ cursor: "pointer" }}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="候选人数量"
                  value={80}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="职位数量"
                  value={20}
                  prefix={<TeamOutlined />}
                />
              </Card>
            </Col>
          </Row>
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

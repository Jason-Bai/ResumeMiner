import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import {
  FileTextOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

const Home: React.FC = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <Statistic
              title="简历总数"
              value={100}
              prefix={<FileTextOutlined />}
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
            <Statistic title="职位数量" value={20} prefix={<TeamOutlined />} />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 16 }}>
        <Card title="最近更新">
          <ul>
            <li>张三的简历 - 2024-03-26</li>
            <li>李四的简历 - 2024-03-25</li>
            <li>王五的简历 - 2024-03-24</li>
          </ul>
        </Card>
      </Card>
    </div>
  );
};

export default Home;

import React from "react";
import { Card, Row, Col, Statistic, Button } from "antd";
import { useNavigate } from "react-router-dom";
import {
  FileTextOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

const Home: React.FC = () => {
  const navigate = useNavigate();

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
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card title="快速操作">
              <Button type="primary" block onClick={() => navigate("/resumes")}>
                查看简历列表
              </Button>
              <Button style={{ marginTop: 16 }} block>
                上传新简历
              </Button>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="最近更新">
              <ul>
                <li>张三的简历 - 2024-03-26</li>
                <li>李四的简历 - 2024-03-25</li>
                <li>王五的简历 - 2024-03-24</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Home;

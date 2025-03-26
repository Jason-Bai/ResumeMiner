import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import { useNavigate } from "react-router-dom";
import {
  FileTextOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

interface StatisticsProps {
  resumeCount: number;
  candidateCount: number;
  positionCount: number;
}

const Statistics: React.FC<StatisticsProps> = ({
  resumeCount = 0,
  candidateCount = 0,
  positionCount = 0,
}) => {
  const navigate = useNavigate();

  return (
    <div style={{ width: "80%", margin: "0 auto 16px" }}>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card onClick={() => navigate("/resumes/list")}>
            <Statistic
              title="简历总数"
              value={resumeCount}
              prefix={<FileTextOutlined />}
              style={{ cursor: "pointer" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="候选人数量"
              value={candidateCount}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="职位数量"
              value={positionCount}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Statistics;

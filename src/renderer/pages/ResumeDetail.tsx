import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Descriptions, Button, Space, Divider } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const ResumeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 模拟数据
  const resumeData = {
    name: "张三",
    position: "高级前端工程师",
    experience: "5年",
    updateTime: "2024-03-26",
    skills: ["React", "TypeScript", "Node.js", "Webpack"],
    workExperience: [
      {
        company: "ABC科技有限公司",
        position: "高级前端工程师",
        period: "2020-至今",
        description:
          "负责公司核心产品的前端开发工作，带领团队完成多个重要项目。",
      },
      {
        company: "XYZ互联网公司",
        position: "前端工程师",
        period: "2018-2020",
        description: "参与公司主要产品的开发和维护工作。",
      },
    ],
    education: [
      {
        school: "某某大学",
        degree: "计算机科学与技术",
        period: "2014-2018",
      },
    ],
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/resumes/list")}
        >
          返回列表
        </Button>
      </Space>

      <Card title="基本信息">
        <Descriptions column={2}>
          <Descriptions.Item label="姓名">{resumeData.name}</Descriptions.Item>
          <Descriptions.Item label="职位">
            {resumeData.position}
          </Descriptions.Item>
          <Descriptions.Item label="工作经验">
            {resumeData.experience}
          </Descriptions.Item>
          <Descriptions.Item label="更新时间">
            {resumeData.updateTime}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Divider />

      <Card title="技能特长">
        <Space wrap>
          {resumeData.skills.map((skill) => (
            <Button key={skill}>{skill}</Button>
          ))}
        </Space>
      </Card>

      <Divider />

      <Card title="工作经历">
        {resumeData.workExperience.map((work, index) => (
          <div key={index} style={{ marginBottom: 16 }}>
            <h3>{work.company}</h3>
            <p>
              {work.position} | {work.period}
            </p>
            <p>{work.description}</p>
          </div>
        ))}
      </Card>

      <Divider />

      <Card title="教育背景">
        {resumeData.education.map((edu, index) => (
          <div key={index}>
            <h3>{edu.school}</h3>
            <p>
              {edu.degree} | {edu.period}
            </p>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default ResumeDetail;

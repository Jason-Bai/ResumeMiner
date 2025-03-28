import React, { useState, useEffect } from "react";
import { Table, Card, Button, Space, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { Resume } from "../../main/database/entities/Resume";

const ResumeList: React.FC = () => {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);

  useEffect(() => {
    window.electronAPI.getResumes().then((resumes) => {
      setResumes(resumes);
    });
  }, []);

  const columns: ColumnsType<Resume> = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "求职意向",
      dataIndex: "job_intention",
      key: "job_intention",
      render: (text) => text || "-",
    },
    {
      title: "最高学历",
      key: "education",
      render: (_, record) => {
        if (!record.education || record.education.length === 0) return "-";
        const highestEdu = record.education[0];
        return `${highestEdu.school} | ${highestEdu.major} | ${highestEdu.degree}`;
      },
    },
    {
      title: "技能",
      key: "skills",
      render: (_, record) => {
        if (!record.skills || record.skills.length === 0) return "-";
        return (
          <>
            {record.skills.map((skill) => (
              <Tag key={skill}>{skill}</Tag>
            ))}
          </>
        );
      },
    },
    {
      title: "更新时间",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => navigate(`/resumes/${record.id}`)}>
            查看详情
          </Button>
        </Space>
      ),
    },
  ];

  console.log(resumes);

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/")}>
          返回首页
        </Button>
      </Space>

      <Card title="简历列表" extra={<Button type="primary">上传简历</Button>}>
        <Table columns={columns} dataSource={resumes} rowKey="id" />
      </Card>
    </div>
  );
};

export default ResumeList;

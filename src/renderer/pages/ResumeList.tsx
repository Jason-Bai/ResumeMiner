import React, { useState, useEffect } from "react";
import { Table, Card, Button, Space } from "antd";
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
      title: "职位",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "工作经验",
      dataIndex: "experience",
      key: "experience",
    },
    {
      title: "学历",
      dataIndex: "education",
      key: "education",
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
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

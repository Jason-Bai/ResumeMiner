import React from "react";
import { Table, Card, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

interface ResumeItem {
  id: string;
  name: string;
  position: string;
  experience: string;
  education: string;
  updateTime: string;
}

const ResumeList: React.FC = () => {
  const navigate = useNavigate();

  // 模拟数据
  const data: ResumeItem[] = [
    {
      id: "1",
      name: "张三",
      position: "高级前端工程师",
      experience: "5年",
      education: "本科",
      updateTime: "2024-03-26",
    },
    {
      id: "2",
      name: "李四",
      position: "全栈开发工程师",
      experience: "3年",
      education: "硕士",
      updateTime: "2024-03-25",
    },
  ];

  const columns: ColumnsType<ResumeItem> = [
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

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/")}>
          返回首页
        </Button>
      </Space>

      <Card title="简历列表" extra={<Button type="primary">上传简历</Button>}>
        <Table columns={columns} dataSource={data} rowKey="id" />
      </Card>
    </div>
  );
};

export default ResumeList;

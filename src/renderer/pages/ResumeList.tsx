import React, { useState, useEffect } from "react";
import { List, Card, Button, Space, Tag, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import { Resume } from "../types/resume";

const ResumeList: React.FC = () => {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    window.electronAPI
      .getResumes()
      .then((data) => {
        setResumes([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getHighestEducation = (education: Resume["education"]) => {
    if (!education || education.length === 0) return "-";
    const highestEdu = education[0];
    return `${highestEdu.school} | ${highestEdu.major} | ${highestEdu.degree}`;
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/")}>
          返回首页
        </Button>
      </Space>

      <Card
        title="简历列表"
        extra={<Button type="primary">上传简历</Button>}
        bodyStyle={{ padding: "24px 0" }}
      >
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          dataSource={resumes}
          loading={loading}
          renderItem={(resume) => (
            <List.Item>
              <Card
                hoverable
                style={{ margin: "0 12px" }}
                onClick={() => navigate(`/resumes/${resume.id}`)}
              >
                <div style={{ textAlign: "center", marginBottom: 16 }}>
                  <Avatar
                    size={64}
                    icon={<UserOutlined />}
                    style={{ backgroundColor: "#1890ff" }}
                  />
                  <h3 style={{ marginTop: 8, marginBottom: 4 }}>
                    {resume.name}
                  </h3>
                  <div style={{ color: "#666" }}>
                    {resume.job_intention || "-"}
                  </div>
                </div>

                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>
                    最高学历
                  </div>
                  <div style={{ color: "#666", fontSize: "13px" }}>
                    {getHighestEducation(resume.education)}
                  </div>
                </div>

                {resume.skills && resume.skills.length > 0 && (
                  <div>
                    <div style={{ fontWeight: 500, marginBottom: 4 }}>
                      技能标签
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "4px",
                        fontSize: "12px",
                      }}
                    >
                      {resume.skills.slice(0, 3).map((skill) => (
                        <Tag key={skill} style={{ margin: 0 }}>
                          {skill}
                        </Tag>
                      ))}
                      {resume.skills.length > 3 && (
                        <Tag style={{ margin: 0 }}>
                          +{resume.skills.length - 3}
                        </Tag>
                      )}
                    </div>
                  </div>
                )}

                <div
                  style={{
                    marginTop: 16,
                    padding: "8px 0",
                    borderTop: "1px solid #f0f0f0",
                    fontSize: "12px",
                    color: "#999",
                    textAlign: "right",
                  }}
                >
                  更新于 {new Date(resume.updatedAt).toLocaleDateString()}
                </div>
              </Card>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default ResumeList;

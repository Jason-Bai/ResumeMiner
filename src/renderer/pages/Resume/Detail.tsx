import React, { useEffect, useState } from "react";
import {
  Card,
  Descriptions,
  Button,
  Space,
  Divider,
  Tag,
  Empty,
  Alert,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Stage, Resume } from "../../types/resume";
import { useHomeContext } from "../Home/HomeContext";
import { ipcInvoke } from "../../utils/ipc";

const ResumeDetail: React.FC = () => {
  const { resumeId, setStage } = useHomeContext();

  console.log(resumeId);

  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const handleGetResumeById = async (id: number): Promise<Resume> => {
    try {
      const resumeData = await ipcInvoke<Resume>("getResume", id.toString(), {
        onError: (error: Error) => {
          console.error("获取简历详情失败:", error);
          setError(error);
          throw error;
        },
      });
      return resumeData;
    } catch (error) {
      console.error("获取简历详情失败:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (!resumeId) return;

    setLoading(true);

    handleGetResumeById(resumeId)
      .then((data) => {
        setResume(data);
      })
      .catch((error) => {
        console.error("获取简历详情失败:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [resumeId]);

  if (loading) {
    return <div>加载中...</div>;
  }

  if (!resume) {
    return (
      <Empty description="未找到简历信息" style={{ marginTop: "100px" }} />
    );
  }

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => setStage(Stage.Show_Result)}
        >
          返回
        </Button>
      </Space>

      {error && (
        <Alert
          message="获取简历详情失败"
          description={error.message}
          type="error"
        />
      )}

      {/* 基本信息 */}
      <Card title="基本信息" style={{ marginBottom: 16 }}>
        <Descriptions column={2}>
          <Descriptions.Item label="姓名">{resume.name}</Descriptions.Item>
          <Descriptions.Item label="性别">
            {resume.gender || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="出生日期">
            {resume.birth_date || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="求职意向">
            {resume.job_intention || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="期望城市">
            {resume.intended_city || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="更新时间">
            {new Date(resume.updatedAt).toLocaleString()}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* 自我评价 */}
      {resume.self_evaluation && (
        <>
          <Card title="自我评价" style={{ marginBottom: 16 }}>
            <p style={{ whiteSpace: "pre-line" }}>{resume.self_evaluation}</p>
          </Card>
        </>
      )}

      {/* 技能特长 */}
      {resume.skills && resume.skills.length > 0 && (
        <>
          <Card title="技能特长" style={{ marginBottom: 16 }}>
            <Space wrap size="middle">
              {resume.skills.map((skill) => (
                <Tag color="blue" key={skill}>
                  {skill}
                </Tag>
              ))}
            </Space>
          </Card>
        </>
      )}

      {/* 证书 */}
      {resume.certificates && resume.certificates.length > 0 && (
        <>
          <Card title="证书" style={{ marginBottom: 16 }}>
            <Space direction="vertical" style={{ width: "100%" }}>
              {resume.certificates.map((cert, index) => (
                <Tag color="green" key={index}>
                  {cert}
                </Tag>
              ))}
            </Space>
          </Card>
        </>
      )}

      {/* 工作经历 */}
      {resume.experience && resume.experience.length > 0 && (
        <>
          <Card title="工作经历" style={{ marginBottom: 16 }}>
            {resume.experience.map((exp, index) => (
              <div
                key={index}
                style={{
                  marginBottom: index < resume.experience!.length - 1 ? 16 : 0,
                }}
              >
                <h3>{exp.company}</h3>
                <p style={{ margin: "8px 0" }}>
                  <Tag color="purple">{exp.position}</Tag> |{" "}
                  <span>{exp.period}</span>
                </p>
                <p style={{ whiteSpace: "pre-line", color: "#666" }}>
                  {exp.description}
                </p>
                {index < resume.experience!.length - 1 && <Divider dashed />}
              </div>
            ))}
          </Card>
        </>
      )}

      {/* 教育背景 */}
      {resume.education && resume.education.length > 0 && (
        <>
          <Card title="教育背景" style={{ marginBottom: 16 }}>
            {resume.education.map((edu, index) => (
              <div
                key={index}
                style={{
                  marginBottom: index < resume.education!.length - 1 ? 16 : 0,
                }}
              >
                <h3>{edu.school}</h3>
                <p style={{ margin: "8px 0" }}>
                  {edu.major && <Tag color="orange">{edu.major}</Tag>}
                  {edu.degree && (
                    <>
                      {" "}
                      | <span>{edu.degree}</span>
                    </>
                  )}
                  {edu.period && (
                    <>
                      {" "}
                      | <span>{edu.period}</span>
                    </>
                  )}
                </p>
                {index < resume.education!.length - 1 && <Divider dashed />}
              </div>
            ))}
          </Card>
        </>
      )}
    </div>
  );
};

export default ResumeDetail;

import { useEffect, useState } from "react";
import { Button, Input, List, message, Modal, Space, Switch } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  handleGetPrompts,
  handleSavePrompt,
  handleUpdatePrompt,
  handleDeletePrompt,
} from "../../../services/prompt";
import { Prompt } from "../../../types/prompt";

const formatJSON = (jsonString: string) => {
  try {
    const parsed = JSON.parse(jsonString);
    return JSON.stringify(parsed, null, 2);
  } catch (e) {
    return jsonString;
  }
};

const validateJSON = (jsonString: string) => {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (e) {
    return false;
  }
};

const PromptList = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [form, setForm] = useState({ name: "", content: "", isActive: true });

  useEffect(() => {
    handleGetPrompts().then((prompts) => {
      setPrompts(prompts);
    });
  }, []);

  // 添加/编辑提示词
  const handleSubmit = async () => {
    if (!form.name || !form.content) {
      message.error("请填写完整信息");
      return;
    }

    // 验证 JSON 格式
    if (!validateJSON(form.content)) {
      message.error("提示词内容必须是有效的 JSON 格式");
      return;
    }

    try {
      // 压缩 JSON 以存储
      const compressedContent = JSON.stringify(JSON.parse(form.content));
      const submitData = { ...form, content: compressedContent };

      if (editingPrompt) {
        await handleUpdatePrompt(editingPrompt.id, submitData);
        setPrompts(
          prompts.map((p) =>
            p.id === editingPrompt.id ? { ...p, ...submitData } : p
          )
        );
        message.success("更新成功");
      } else {
        const newPrompt = await handleSavePrompt(submitData);
        setPrompts([...prompts, newPrompt]);
        message.success("添加成功");
      }
      setIsModalOpen(false);
      setEditingPrompt(null);
      setForm({ name: "", content: "", isActive: true });
    } catch (error) {
      message.error("操作失败");
    }
  };

  // 删除提示词
  const handleDelete = async (id: string) => {
    try {
      await handleDeletePrompt(id);
      setPrompts(prompts.filter((p) => p.id !== id));
      message.success("删除成功");
    } catch (error) {
      message.error("删除失败");
    }
  };

  // 编辑提示词
  const handleEdit = (prompt: Prompt) => {
    setEditingPrompt(prompt);
    setForm({
      name: prompt.name,
      content: formatJSON(prompt.content), // 美化 JSON 用于编辑
      isActive: prompt.isActive,
    });
    setIsModalOpen(true);
  };

  return (
    <div style={{ padding: "24px" }}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalOpen(true)}
        style={{ marginBottom: 16 }}
      >
        添加提示词
      </Button>

      <List
        bordered
        dataSource={prompts}
        renderItem={(item) => (
          <List.Item>
            <div style={{ flex: 1 }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span>{item.name}</span>
                <Switch
                  size="small"
                  checked={item.isActive}
                  onChange={async (checked) => {
                    try {
                      await handleUpdatePrompt(item.id, { isActive: checked });
                      setPrompts(
                        prompts.map((p) =>
                          p.id === item.id ? { ...p, isActive: checked } : p
                        )
                      );
                    } catch (error) {
                      message.error("更新状态失败");
                    }
                  }}
                />
              </div>
              <pre
                style={{
                  color: "#666",
                  marginTop: "8px",
                  background: "#f5f5f5",
                  padding: "8px",
                  borderRadius: "4px",
                  maxHeight: "200px",
                  overflow: "auto",
                }}
              >
                {formatJSON(item.content)}
              </pre>
            </div>
            <Space>
              <Button
                icon={<EditOutlined />}
                onClick={() => handleEdit(item)}
              />
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(item.id)}
              />
            </Space>
          </List.Item>
        )}
      />

      <Modal
        title={editingPrompt ? "编辑提示词" : "添加提示词"}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingPrompt(null);
          setForm({ name: "", content: "", isActive: true });
        }}
        width={800}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            placeholder="名称"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input.TextArea
            placeholder="提示词内容 (JSON 格式)"
            value={form.content}
            rows={12}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            style={{ fontFamily: "monospace" }}
          />
          <div>
            <span style={{ marginRight: "8px" }}>是否启用：</span>
            <Switch
              checked={form.isActive}
              onChange={(checked) => setForm({ ...form, isActive: checked })}
            />
          </div>
        </Space>
      </Modal>
    </div>
  );
};

export default PromptList;

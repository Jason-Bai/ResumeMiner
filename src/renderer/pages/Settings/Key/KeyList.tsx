// 该页面用于支持用户添加类openai的key（比如deepseek），用于后续调用
import { useEffect, useState } from "react";
import { Button, Input, List, message, Modal, Space, Switch } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  handleGetKeys,
  handleSaveKey,
  handleUpdateKey,
  handleDeleteKey,
} from "../../../services/key";
import { Key } from "../../../types/key";

// 管理API密钥的组件
const KeyList = () => {
  const [keys, setKeys] = useState<Key[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState<Key | null>(null);
  const [form, setForm] = useState({ name: "", key: "", isActive: true });

  useEffect(() => {
    handleGetKeys().then((keys) => {
      setKeys(keys);
    });
  }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.key) {
      message.error("请填写完整信息");
      return;
    }

    try {
      if (editingKey) {
        await handleUpdateKey(editingKey.id, form);
        setKeys(
          keys.map((k) => (k.id === editingKey.id ? { ...k, ...form } : k))
        );

        message.success("更新成功");
      } else {
        const newKey = await handleSaveKey(form);
        setKeys([...keys, newKey]);
        message.success("添加成功");
      }
      setIsModalOpen(false);
      setEditingKey(null);
      setForm({ name: "", key: "", isActive: true });
    } catch (error) {
      message.error("操作失败");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await handleDeleteKey(id);
      setKeys(keys.filter((k) => k.id !== id));
      message.success("删除成功");
    } catch (error) {
      message.error("删除失败");
    }
  };

  const handleEdit = (key: Key) => {
    setEditingKey(key);
    setForm({
      name: key.name,
      key: key.key,
      isActive: key.isActive,
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
        添加密钥
      </Button>

      <List
        bordered
        dataSource={keys}
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
                      await handleUpdateKey(item.id, { isActive: checked });
                      setKeys(
                        keys.map((k) =>
                          k.id === item.id ? { ...k, isActive: checked } : k
                        )
                      );
                    } catch (error) {
                      message.error("更新状态失败");
                    }
                  }}
                />
              </div>
              <div style={{ color: "#666", marginTop: "8px" }}>{item.key}</div>
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
        title={editingKey ? "编辑密钥" : "添加密钥"}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingKey(null);
          setForm({ name: "", key: "", isActive: true });
        }}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            placeholder="名称"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input.Password
            placeholder="密钥"
            value={form.key}
            onChange={(e) => setForm({ ...form, key: e.target.value })}
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

export default KeyList;

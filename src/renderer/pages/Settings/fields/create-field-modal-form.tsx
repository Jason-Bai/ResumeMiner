import React from "react";
import { Modal, Form, Input, InputNumber, Select } from "antd";

interface CreateFieldModalFormProps {
  visible: boolean;
  onOk: (values: any) => void;
  onCancel: () => void;
}

const CreateFieldModalForm: React.FC<CreateFieldModalFormProps> = ({
  visible,
  onOk,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      onOk(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      title="新建字段"
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="字段中文名"
          name="chineseName"
          rules={[{ required: true, message: "请输入字段中文名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="字段英文名"
          name="englishName"
          rules={[{ required: true, message: "请输入字段英文名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="数据类型"
          name="dataType"
          rules={[{ required: true, message: "请选择数据类型" }]}
        >
          <Select>
            <Select.Option value="string">字符串</Select.Option>
            <Select.Option value="number">数字</Select.Option>
            <Select.Option value="boolean">布尔值</Select.Option>
            <Select.Option value="date">日期</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="排序"
          name="order"
          rules={[{ required: true, message: "请输入排序" }]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item label="备注" name="remark">
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateFieldModalForm;

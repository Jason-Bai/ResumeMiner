import React, { useState } from "react";
import { Table, Input, Button } from "antd";
import CreateFieldModalForm from "./create-field-modal-form";

const Fields = () => {
  const [data, setData] = useState([
    {
      key: "1",
      chineseName: "字段一",
      englishName: "FieldOne",
      dataType: "字符串",
      order: 1,
      remark: "备注一",
    },
    {
      key: "2",
      chineseName: "字段二",
      englishName: "FieldTwo",
      dataType: "数字",
      order: 2,
      remark: "备注二",
    },
  ]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleAddField = (values: any) => {
    const newField = {
      key: `${data.length + 1}`,
      ...values,
    };
    setData([...data, newField]);
    setIsModalVisible(false);
  };

  const filteredData = data.filter(
    (item) =>
      item.chineseName.includes(searchText) ||
      item.englishName.includes(searchText) ||
      item.remark.includes(searchText),
  );

  const columns = [
    {
      title: "字段中文名",
      dataIndex: "chineseName",
      key: "chineseName",
    },
    {
      title: "字段英文名",
      dataIndex: "englishName",
      key: "englishName",
    },
    {
      title: "数据类型",
      dataIndex: "dataType",
      key: "dataType",
    },
    {
      title: "排序",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "备注",
      dataIndex: "remark",
      key: "remark",
    },
  ];

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <Input.Search
          placeholder="搜索字段"
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          新建字段
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
      />
      <CreateFieldModalForm
        visible={isModalVisible}
        onOk={handleAddField}
        onCancel={() => setIsModalVisible(false)}
      />
    </div>
  );
};

export default Fields;

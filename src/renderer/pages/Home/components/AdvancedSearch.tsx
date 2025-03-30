import { Space } from "antd";
import FilterSelector from "./filter-selector";
import { useHomeContext } from "../HomeContext";

const AdvancedSearch = () => {
  const { setSearchBaseParams, searchBaseParams } = useHomeContext();

  // 处理性别选择
  const handleGenderSelect = (selectedGender: string) => {
    setSearchBaseParams({
      ...searchBaseParams,
      gender: selectedGender,
    });
  };

  // 处理技能选择
  const handleSkillsSelect = (selectedSkills: string | string[]) => {
    setSearchBaseParams({
      ...searchBaseParams,
      skills: selectedSkills as string[],
    });
  };

  return (
    <div
      style={{
        marginTop: "16px",
        padding: "16px",
        background: "#f5f5f5",
        borderRadius: "8px",
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div style={{ width: "60px", color: "#666" }}>性别：</div>
          <FilterSelector
            label="性别"
            options={[
              { label: "男", value: "男" },
              { label: "女", value: "女" },
            ]}
            value={searchBaseParams.gender ? [searchBaseParams.gender] : []}
            onChange={(values) => handleGenderSelect(values as string)}
            style={{ flex: 2 }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div style={{ width: "60px", color: "#666" }}>技能：</div>
          <FilterSelector
            label="技能"
            options={[
              { label: "React", value: "React" },
              { label: "TypeScript", value: "TypeScript" },
              { label: "Vue", value: "Vue" },
              { label: "Node.js", value: "Node.js" },
            ]}
            value={searchBaseParams.skills}
            onChange={handleSkillsSelect}
            mode="multiple"
            style={{ flex: 2 }}
          />
        </div>
      </Space>
    </div>
  );
};

export default AdvancedSearch;

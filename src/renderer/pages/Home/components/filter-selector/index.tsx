import { Select } from "antd";
import type { SelectProps } from "antd";
import { useState } from "react";

const { Option } = Select;

interface FilterSelectorProps {
  label: string;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  options: SelectProps["options"];
  placeholder?: string;
  style?: React.CSSProperties;
  mode?: "multiple" | "tags";
}

const FilterSelector = ({
  label,
  value,
  onChange,
  options,
  placeholder = "请选择",
  style,
  mode,
}: FilterSelectorProps) => {
  const [searchValue, setSearchValue] = useState("");

  const onSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div style={style}>
      <Select
        style={{ width: "100%" }}
        placeholder={placeholder}
        dropdownRender={(menu) => (
          <>
            <Option value="">{`${label}不限`}</Option>
            <div>{menu}</div>
          </>
        )}
        options={options}
        value={value}
        onChange={onChange}
        filterOption={(input, option) =>
          (option?.label ?? "")
            ?.toString()
            .toLowerCase()
            .indexOf(input.toLowerCase()) !== -1
        }
        mode={mode}
        onSearch={onSearch}
      />
    </div>
  );
};

export default FilterSelector;

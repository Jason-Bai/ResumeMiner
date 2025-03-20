import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from "antd";

const DropdownMenu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key); // Navigate to the selected route
    setIsOpen(false);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="/settings">Settings</Menu.Item>
    </Menu>
  );

  return (
    <div className="absolute top-4 right-4" ref={dropdownRef}>
      <Dropdown overlay={menu} trigger={["click"]}>
        <MenuOutlined
          className="cursor-pointer text-2xl"
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </Dropdown>
    </div>
  );
};

export default DropdownMenu;

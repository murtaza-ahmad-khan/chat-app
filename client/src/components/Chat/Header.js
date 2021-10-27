import React, { useContext } from "react";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

import { logout } from "../../api/auth";
import { AuthContext } from "../../context/AuthProvider";

export default function Header({ history }) {
  const {
    state: { user },
  } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location = "/login";
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <header className="chat__header">
      <h4 className="text-white">Socket.io</h4>
      <Dropdown overlay={menu}>
        <div>
          <span className="me-1">{user.name}</span>
          <DownOutlined />
        </div>
      </Dropdown>
    </header>
  );
}

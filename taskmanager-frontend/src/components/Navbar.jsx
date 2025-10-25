import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

const Navbar = () => {
  return (
    <Menu mode="horizontal" theme="dark" style={{ marginBottom: 16 }}>
      <Menu.Item key="home">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="create">
        <Link to="/create">Create Task</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;

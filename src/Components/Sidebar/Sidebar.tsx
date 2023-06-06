import "./Sidebar.scss";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <div className="Sidebar__Upper">
        <Button className="Sidebar__Upper__Button">
          <MenuUnfoldOutlined style={{ fontSize: "23px", opacity: "50%" }} />
        </Button>
        <Button className="Sidebar__Upper__Button">
          <MenuUnfoldOutlined style={{ fontSize: "23px" }} />
        </Button>
        <Button className="Sidebar__Upper__Button">
          <MenuUnfoldOutlined style={{ fontSize: "23px" }} />
        </Button>
        <Button className="Sidebar__Upper__Button">
          <MenuUnfoldOutlined style={{ fontSize: "23px" }} />
        </Button>
        <Button className="Sidebar__Upper__Button">
          <MenuUnfoldOutlined style={{ fontSize: "23px" }} />
        </Button>
        <Button className="Sidebar__Upper__Button">
          <MenuUnfoldOutlined style={{ fontSize: "23px" }} />
        </Button>
      </div>
      <div className="Sidebar__Lower">
        <Button className="Sidebar__Upper__Button">
          <MenuUnfoldOutlined style={{ fontSize: "23px" }} />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;

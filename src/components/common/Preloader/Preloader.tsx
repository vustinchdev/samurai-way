import { Space, Spin } from "antd";
import React from "react";
import s from "./Preloader.module.css";

export const Preloader: React.FC = () => (
  <div className={s.center}>
    <Space size="middle">
      <Spin size="large" />
    </Space>
  </div>
);

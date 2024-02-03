import { Result } from "antd";
import React from "react";
import s from "./ErrorPage.module.css";

export const ErrorPage: React.FC = () => (
  <div className={s.errorPage}>
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
    />
  </div>
);

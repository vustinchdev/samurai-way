import React from "react";
import s from "./Header.module.css";
import { NavLink } from "react-router-dom";

type HeaderType = {
  isAuth: boolean;
  login: string | null;
  logout: () => void;
};

export const Header: React.FC<HeaderType> = (props) => {
  return (
    <header className={s.header}>
      <img src="https://e7.pngegg.com/pngimages/851/133/png-clipart-www-logo-internet-computer-icons-world-wide-web-web-design-text.png" />
      <div className={s.loginBlock}>
        {props.isAuth ? (
          <div>
            {props.login} - <button onClick={props.logout}>Log out</button>
          </div>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

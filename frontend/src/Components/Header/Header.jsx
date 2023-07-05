import React from "react";
import logo from "../../assets/images/logo-universal.png";
import { github, discord, telegram } from "../../vars";
import "./header.css";

const Header = ({ toggleSettings }) => {
  return (
    <header className="header">
      <div className="header-logo">
        <a href="/">
          <img width={40} height={40} src={logo} alt="logo" />
        </a>
      </div>
      <nav className="nev-menu">
        <a href={github} className="menu-item" target="_blank">
          GitHub
        </a>
        <a href={telegram} className="menu-item" target="_blank">
          Telegram
        </a>
        <a href={discord} className="menu-item" target="_blank">
          Discord
        </a>
        <a href="#" className="menu-item" onClick={toggleSettings}>
          FAQ
        </a>
      </nav>
    </header>
  );
};

export default Header;

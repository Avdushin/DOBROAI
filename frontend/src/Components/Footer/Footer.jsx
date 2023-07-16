import React from "react";
import { AI } from "../../vars";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-box">
        <div className="description">
          <p>
            Клиент ChatGPT
          </p>
        </div>
        <div className="version">
          <p>Версия: {AI.version} </p>
        </div>
      </div>
      <div className="Copyright">
        <p>&copy; 2022 ITDOBRO </p>
      </div>
    </footer>
  );
}

export default Footer;

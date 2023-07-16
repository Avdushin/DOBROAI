import React from "react";
import { AI } from "../../vars";
import './FAQ.css'

function FAQ({ isOpen, toggleSettings }) {
  return (
    <div className="settings-popup">
      <div className="popup-box">
        <div className="settings-title">Часто задаваемые вопросы</div>
        <div className="settings-close" onClick={toggleSettings}>
          &#10006;
        </div>
        <div className="faq-answ">
          <ul>
            <li className="q">Что это за программа?</li>
            <li className="qa">
              Это клиент для работы с{" "}
              <a href="https://chat.openai.com/" target="_blank">
                ChatGPT
              </a>
              , написанный на Wails (
              <a href="https://go.dev" target="_blank">
                Golang
              </a>{" "}
              и{" "}
              <a href="https://react.dev/" target="_blank">
                ReactJS
              </a>
              )
            </li>
            <li className="q">
              У меня есть идея, как улучшить приложение! Что делать?
            </li>
            <li className="qa">
              Напишите ваше предложение в обсуждениях в{" "}
              <a href={AI.repo} target="_blank">
                GitHub репозитории
              </a>
            </li>
            <li className="q">У меня не работает ChatGPT! Как починить?</li>
            <li className="qa">
              Вам нужно добавить файл <code>.env</code>, содержащий
              переменную <code>OpenAIKey</code> с вашим токеном от{" "}
              <a
                href="https://platform.openai.com/account/api-keys"
                target="_blank"
              >
                OPEN AI
              </a>{" "}
              <br />
              Пример: <br />
              <code className="token">
                OpenAIKey="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"
              </code>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FAQ;

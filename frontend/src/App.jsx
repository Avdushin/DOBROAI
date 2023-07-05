import { useState, useEffect } from "react";
import { Greet, ChatGPT } from "../wailsjs/go/main/App";
import ReactMarkdown from "react-markdown";
import sendBtn from "./assets/icons/send.svg";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { github } from "./vars";
import "./App.css";

function App() {
  // gpt
  const [answerText, setAnswerText] = useState("");
  const [querry, setQuerry] = useState("");
  const updateResultQuerry = (e) => setQuerry(e.target.value);

  const updateAnswer = (answer) => {
    setAnswerText(answer);
  };

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  function gpt() {
    ChatGPT(querry)
      .then(updateAnswer)
      .finally(resetQuerry)
      .catch((error) => {
        console.error("Ошибка:", error);
        showNotification("Введите ваш токен от OpenAI");
      });
  }

  const resetQuerry = () => {
    setQuerry("");
  };

  return (
    <>
      {isSettingsOpen && (
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
                  </a>
                  <a href="https://react.dev/" target="_blank">
                    ReactJS
                  </a>
                  )
                </li>
                <li className="q">
                  У меня есть идея, как улучшить приложение! Что делать?
                </li>
                <li className="qa">
                  Напишите ваше предложение в обсуждениях в
                  <a href="https://github.com/Avdushin/DOBROAI" target="_blank">
                    GitHub репозитории
                  </a>
                </li>
                <li className="q">dd</li>
                <li className="qa">dd</li>
                <li className="q">dd</li>
                <li className="qa">dd</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <Header toggleSettings={toggleSettings} />
      <div id="root" className="gpt">
        <div className="brand">
          <a href={github} target="_blank">
            ITDOBRO
          </a>
          <br />
          <div className="preffix">
            <span className="green">GPT &nbsp;</span>
            <span className="orange">CLIENT</span>
          </div>
        </div>
        <div id="answer" className="answer">
          <div className="scrollable-content">
            <ReactMarkdown>{answerText}</ReactMarkdown>
          </div>
        </div>
        <div id="input" className="input-box">
          <textarea
            id="querry"
            className="input"
            value={querry}
            onChange={updateResultQuerry}
            autoComplete="off"
            name="input"
            type="text"
            style={{
              height: "40px",
              lineHeight: "0.9",
              paddingTop: "10px",
              fontSize: "14px",
            }}
            placeholder="Введите запрос..."
          />
          <div className="btn send-btn" onClick={gpt}>
            <img src={sendBtn} alt="send-button" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;

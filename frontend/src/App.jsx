import { useState, useEffect, useRef } from "react";
import { ChatGPT } from "../wailsjs/go/main/App";
import ReactMarkdown from "react-markdown";
import { BeatLoader } from "react-spinners";
import sendBtn from "./assets/icons/send.svg";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import FAQ from "./Components/FAQ/FAQ";
import Card from "./Components/Card/Card";
import data from "./assets/data/data";
import gptAvatar from "./assets/images/chatgpt-logo.jpg";
import userAvatar from "./assets/images/user.png"
import { AI } from "./vars";
import "./App.css";

function App() {
  const [answerText, setAnswerText] = useState("");
  const [querry, setQuerry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const textareaRef = useRef(null);

  const handleTextareaResize = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "40px";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleTextareaChange = (event) => {
    setQuerry(event.target.value);
  };

  const handleCardClick = (text) => {
    textareaRef.current.value = text;
    setQuerry(text);
  };

  const handleTextareaKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      gpt();
    }
  };

  const RealodPage = (event) => {
    if (
      (event.ctrlKey && event.key === "r") ||
      (event.ctrlKey && event.key === "к")
    ) {
      event.preventDefault();
      window.location.reload();
    }
  };

  const updateAnswer = (answer) => {
    setAnswerText(answer);
    addToChatHistory({ question: querry, answer: answer });
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  function gpt() {
    if (querry.trim() !== "") {
      startLoading();
      ChatGPT(querry)
        .then(updateAnswer)
        .catch((error) => {
          console.error(error);
          updateAnswer("Произошла ошибка при обработке запроса.");
        })
        .finally(() => {
          stopLoading();
          resetQuerry();
        });
    }
  }

  const resetQuerry = () => {
    setQuerry("");
  };

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const addToChatHistory = (message) => {
    setChatHistory((prevHistory) => [...prevHistory, message]);
  };

  useEffect(() => {
    window.addEventListener("keydown", RealodPage);
    return () => {
      window.removeEventListener("keydown", RealodPage);
    };
  }, []);

  useEffect(() => {
    handleTextareaResize();
  }, [querry]);

  return (
    <>
      {isSettingsOpen && (
        <FAQ isOpen={isSettingsOpen} toggleSettings={toggleSettings} />
      )}

      <Header toggleSettings={toggleSettings} />
      <div id="root" className="gpt">
        <div className="chat-history" id="chat-history">
          {chatHistory.length === 0 ? (
            <div className="logo-container">
              <div className="logo-container__wrapper">
                <h1 className="logo-container__title">{AI.name}</h1>
                <div className="cards__wrapper">
                  {data.map((item, index) => (
                    <Card
                      key={index}
                      title={item.title}
                      description={item.description}
                      handleCardClick={handleCardClick}
                    />
                  ))}
                  <span>Примеры запросов приведены выше - попробуйте!</span>
                </div>
              </div>
            </div>
          ) : (
            chatHistory.map((message, index) => (
              <div key={index}>
                <div className="gpt__question">
                  <div className="gpt__question__avatar">
                    <img src={gptAvatar} alt="ChatGPT" />
                  </div>
                  <div className="gpt__question__question">
                    <ReactMarkdown>{message.question}</ReactMarkdown>
                  </div>
                </div>
                <div className="gpt__answer">
                  <div className="gpt__answer__wrapper">
                    <div className="gpt__answer__avatar">
                      <img src={userAvatar} alt="userAvatar" />
                    </div>
                    <div className="gpt__answer__answer">
                      <ReactMarkdown>{message.answer}</ReactMarkdown>
                    </div>
                  </div>
                  <div
                    className="scroll-to-bottom"
                    onClick={() => {
                      const chatHistory =
                        document.getElementById("chat-history");
                      chatHistory.scrollTop = chatHistory.scrollHeight;
                    }}
                  ></div>
                </div>
              </div>
            ))
          )}
        </div>

        <div id="input" className="input-box">
          <div className="textarea-container">
            <textarea
              ref={textareaRef}
              id="querry"
              className="input"
              value={querry}
              onChange={(e) => {
                setQuerry(e.target.value);
                handleTextareaChange(e);
              }}
              onKeyPress={handleTextareaKeyPress}
              autoComplete="off"
              name="input"
              type="text"
              placeholder="Введите запрос..."
            />
            <div className="btn send-btn" onClick={gpt}>
              {isLoading ? (
                <BeatLoader size={8} color={"#ffffff"} loading={isLoading} />
              ) : (
                <img src={sendBtn} alt="send-button" />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;

# DOBROAI

DOBROAI - это клиент для работы с [ChatGPT](https://chat.openai.com) от компании [AOPENAI](https://openai.com) написанный на Golang + ReactJS

![DOBROAI-DEMO](src/app.jpg)

![DOBROAI-PROMPT](src/prompt.jpg)

### Мотивация

Зачем создан данный проект?

1. Практика работы с openai api
2. Получение опыта в разработке WebView приложений на [Golang](https://go.dev)
3. Попробовать неординарное решение ([Wails](https://wails.io))
4. Укрепить знание Go и ReactJS

### Зависимости

- [GO](https://go.dev/dl)
- [NodeJS](https://nodejs.org/en/download)
- [Wails](https://wails.io)

### Установка

#### Установка Wails

```bash
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

#### Установка зависимостей

```bash
cd DOBROAI/frontend && npm i
cd ..
wails dev
или
wails build # (в папке `build/bin` появится ваш бинарник - не забудьте переместить в неё файл .env с вашим openai токеном)
./build/bin/DobroAI.exe
```

### Переменные окружения

Для работы приложения необходимо создать файл `.env` с определенной в нём переменной `OpenAIKey`, содержащей ваш openai токен

Пример: `OpenAIKey="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"`

### Автор

| Фото | Имя |
|---| ---|
| <img src="./src/ava.jfif" alt="itdobro-ava" width="35px"> | [ITDOBRO](https://github.com/Avdushin) |



<center>
    <a href="https://github.com/Avdushin" target="_blank">&COPY; 2023 ITDOBRO</a>
<center>
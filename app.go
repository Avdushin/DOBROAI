package main

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/sashabaranov/go-openai"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// SaveToken сохраняет токен OpenAI в файл
func (a *App) SaveToken(token string) error {
	err := ioutil.WriteFile("../.env", []byte(token), 0644)

	if err != nil {
		return err
	}
	return nil
}

// LoadToken loads the OpenAI token from the file and sets it as an environment variable
func (a *App) LoadToken() error {
	token, err := ioutil.ReadFile("./.env")

	if err != nil {
		return err
	}
	os.Setenv("OpenAIKey", string(token))
	return nil
}

func (a *App) ChatGPT(querry string) (string, error) {
	// Load .env
	if err := godotenv.Load(); err != nil {
		log.Println("ошибка загрузки .env")
	}

	OpenAIKey := os.Getenv("OpenAIKey")

	client := openai.NewClient(OpenAIKey)

	req := openai.ChatCompletionRequest{
		Model: openai.GPT3Dot5Turbo,
		Messages: []openai.ChatCompletionMessage{
			{
				Role:    openai.ChatMessageRoleSystem,
				Content: "You are a bot who loves to help people!",
			},
		},
	}

	req.Messages = append(req.Messages, openai.ChatCompletionMessage{
		Role:    openai.ChatMessageRoleUser,
		Content: querry,
	})

	defer func() {
		if r := recover(); r != nil {
			log.Println("Ошибка, сейчас восстановлю работу бота:", r)
		}
	}()

	resp, err := client.CreateChatCompletion(context.Background(), req)
	if err != nil {
		return "", fmt.Errorf("ChatCompletion error: %v", err)
	}

	answer := ""
	if len(resp.Choices) > 0 {
		answer = resp.Choices[0].Message.Content
	}

	if answer == "" {
		log.Println("Введен пустой запрос...")
	}

	return answer, nil
}

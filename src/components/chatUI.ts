import { sendMessageToAssistant } from "../api/gptApi";

export async function setupChatUI() {
  const app = document.getElementById("app");
  if (!app) return;

  const userMessage = function (prompt: string) {
    return `  
    <div class="message user">
      <div class="bubble">${prompt}</div>
      <div class="avatar">👤</div>
    </div>`;
  };

  const assistantMessage = function (response: string) {
    return `  
    <div class="message assistant">
      <div class="avatar">🤖</div>
      <div class="bubble">${response}</div>
    </div>`;
  };

  app.innerHTML = `
    <div class="chat-header">
      <h1 class="chat-title">ISTQB Trainer</h1>
      <h4 class="chat-subtitle">Chattez avec votre assistant virtuel afin de poser des questions et simuler des questions/réponses de l'examen ISTQB Fondation.</h4>
      <h4 class="chat-subtitle-disclaimer">Cet assistant est une intelligence artificielle. Gardez en tête que toute information est générée de toute pièce. En cas de doute, préférez des sources d'informations de confiance.</h4>
    </div>
    <div class="chat-container">
      <div id="chat-log" class="chat-log"></div>
      <input id="chat-input" type="text" placeholder="Posez une question à l'assistant..." />
      <button id="send-button">Envoyer</button>
      <button id="random-question-button">Au hasard</button>
    </div>
  `;

  const chatLog = document.getElementById("chat-log");
  const chatInput = document.getElementById("chat-input") as HTMLInputElement;
  const sendButton = document.getElementById("send-button");
  const randomQuestionButton = document.getElementById(
    "random-question-button",
  );

  async function sendMessage(prompt?: string) {
    prompt = prompt || chatInput.value;
    chatInput.value = "";
    if (!userMessage) return;
    if (!chatLog) return;
    if (prompt.length === 0) return;

    chatLog.insertAdjacentHTML("beforeend", userMessage(prompt));
    chatLog.scrollTop = chatLog.scrollHeight;

    try {
      const assistantResponse = await sendMessageToAssistant(prompt);
      chatLog.insertAdjacentHTML(
        "beforeend",
        assistantMessage(assistantResponse),
      );
      chatLog.scrollTop = chatLog.scrollHeight;
    } catch (error: unknown) {
      if (error instanceof Error) {
        chatLog.insertAdjacentHTML(
          "beforeend",
          `<div class="message error">An error occurred: ${error.message}</div>`,
        );
      }
    }
  }

  chatInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  });

  sendButton?.addEventListener("click", async () => {
    await sendMessage();
  });

  randomQuestionButton?.addEventListener("click", async () => {
    await sendMessage(
      "Pose moi une question de difficulté aléatoire, sur un sujet et chapitre aléatoire.",
    );
  });
}

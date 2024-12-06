import { setupChatUI } from "./components/chatUI";
import { startThread } from "./api/gptApi";
import "dotenv/config";

document.addEventListener("DOMContentLoaded", () => {
  setupChatUI();
  startThread();
});

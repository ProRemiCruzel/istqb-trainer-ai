import OpenAI from "openai";
import { Thread } from "openai/src/resources/beta/threads/threads";
import { Message } from "openai/src/resources/beta/threads/messages";
import * as Core from "openai/src/core";
import { TextContentBlock } from "openai/resources/beta/threads/messages";
import { marked } from "marked";

const API_KEY = process.env.OPENAI_API_KEY;
const ASSISTANT_ID = process.env.ASSISTANT_ID;

const openai = new OpenAI({ apiKey: API_KEY, dangerouslyAllowBrowser: true });

let currentThread: Thread;

export async function startThread() {
  currentThread = await openai.beta.threads.create();
}

export async function sendMessageToAssistant(prompt: string): Promise<string> {
  await addMessageToThread(prompt);
  const response = (await runThreadOnAssistant()) as TextContentBlock;
  if (response === undefined)
    throw new Error("Error communicating with GPT API");
  return marked(response.text.value);
}

export async function addMessageToThread(
  prompt: string,
): Promise<Core.APIPromise<Message>> {
  try {
    return await openai.beta.threads.messages.create(currentThread.id, {
      role: "user",
      content: prompt,
    });
  } catch (error) {
    throw error;
  }
}

export async function runThreadOnAssistant(): Promise<
  OpenAI.Beta.Threads.Messages.MessageContent | undefined
> {
  if (!ASSISTANT_ID)
    throw new Error("La variable d'environnement ASSISTANT_ID est manquante");

  let run = await openai.beta.threads.runs.createAndPoll(currentThread.id, {
    assistant_id: ASSISTANT_ID,
  });

  const messages = await openai.beta.threads.messages.list(run.thread_id);
  return messages.data[0].content[0];
}

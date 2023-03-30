"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPostRequest = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = require("crypto");
const utils_1 = require("./utils");
dotenv_1.default.config();
const API_ENDPOINT = "https://chat.openai.com/backend-api/conversation";
const HEADERS = {
    "Content-Type": "application/json",
    Accept: "text/event-stream",
    cookie: process.env.CHATGPT_COOKIES ?? "",
    Authorization: process.env.CHATGPT_AUTH_TOKEN ?? "",
};
/**
 * Sends a POST request to the ChatGPT API with the given prompt and parent message ID.
 *
 * @param options The options for the request.
 * @returns A Promise that resolves to a ChatGPTResponse object.
 */
async function sendPostRequest(options = {}, header = {}) {
    const { parentMessageId = (0, crypto_1.randomUUID)(), conversationId, prompt = "hello world", model = "Default", } = options;
    const modelId = (0, utils_1.getModelId)(model);
    try {
        const messageId = (0, crypto_1.randomUUID)();
        const response = await fetch(API_ENDPOINT, {
            method: "POST",
            headers: { ...HEADERS, ...header },
            body: JSON.stringify({
                action: "next",
                messages: [
                    {
                        id: messageId,
                        role: "user",
                        content: {
                            content_type: "text",
                            parts: [prompt],
                        },
                    },
                ],
                parent_message_id: parentMessageId,
                conversation_id: conversationId,
                model: modelId,
            }),
        });
        switch (response.status) {
            case 200:
                break;
            case 400:
                throw new Error("Bad Request");
            case 401:
                throw new Error("Unauthorized");
            default:
                throw new Error(`Request failed with status code ${response.status}: ${await response.text()}`);
        }
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        const chunks = [];
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            const chunk = decoder.decode(value, { stream: true });
            chunks.push(chunk);
        }
        const finalChunk = chunks[chunks.length - 2];
        const jsonString = finalChunk.replace(/^data:/, "");
        return JSON.parse(jsonString);
    }
    catch (error) {
        console.error("Error sending POST request to ChatGPT API:", error);
        throw error;
    }
}
exports.sendPostRequest = sendPostRequest;

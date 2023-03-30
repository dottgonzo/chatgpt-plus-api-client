import { ChatGPTResponse } from "./chatgpt";
export type ModelOption = "Default" | "Legacy" | "gpt-4";
type SendPostRequestOptions = {
    parentMessageId?: string;
    conversationId?: string;
    prompt?: string;
    model?: ModelOption;
};
/**
 * Sends a POST request to the ChatGPT API with the given prompt and parent message ID.
 *
 * @param options The options for the request.
 * @returns A Promise that resolves to a ChatGPTResponse object.
 */
export declare function sendPostRequest(options?: SendPostRequestOptions, header?: {}): Promise<ChatGPTResponse>;
export {};
//# sourceMappingURL=index.d.ts.map
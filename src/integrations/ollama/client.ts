import { request } from "undici";
import type { Message, OllamaModelInfo } from "../../types/index.js";

export class OllamaClient {
  constructor(private baseUrl = "http://127.0.0.1:11434") {}

  async listModels(): Promise<OllamaModelInfo[]> {
    const res = await request(`${this.baseUrl}/api/tags`);
    const body = (await res.body.json()) as { models?: OllamaModelInfo[] };
    return body.models ?? [];
  }

  async pickModel(preferred: string, fallbacks: string[]): Promise<string> {
    const installed = (await this.listModels()).map((m) => m.name);
    return [preferred, ...fallbacks].find((m) => installed.some((i) => i.includes(m))) ?? installed[0] ?? preferred;
  }

  async *streamChat(model: string, messages: Message[], temperature: number): AsyncGenerator<string> {
    const res = await request(`${this.baseUrl}/api/chat`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        model,
        stream: true,
        options: { temperature },
        messages: messages.map((m) => ({ role: m.role, content: m.content }))
      })
    });

    let buffer = "";
    for await (const chunk of res.body) {
      buffer += chunk.toString();
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.trim()) continue;
        const data = JSON.parse(line) as { message?: { content?: string } };
        if (data.message?.content) yield data.message.content;
      }
    }
  }
}

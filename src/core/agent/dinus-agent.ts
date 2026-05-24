import chokidar from "chokidar";
import ora from "ora";
import type { DinusConfig, Message } from "../../types/index.js";
import { SessionStore } from "../../integrations/sqlite/session-store.js";
import { OllamaClient } from "../../integrations/ollama/client.js";
import { Planner } from "../planning/planner.js";
import { SandboxExecutor } from "../sandbox/executor.js";
import { CodeIndexer } from "../context/indexer.js";
import { SemanticSearch } from "../context/semantic-search.js";

export class DinusAgent {
  private store = new SessionStore();
  private planner = new Planner();
  private ollama = new OllamaClient();
  private indexer = new CodeIndexer();

  constructor(private config: DinusConfig, private cwd: string) {}

  async init(): Promise<void> {
    await this.store.init();
    chokidar.watch(this.cwd, { ignored: /(^|[/\\])\../ }).on("change", () => {
      // background invalidation point for future indexing cache
    });
  }

  async runChat(userInput: string, onToken: (token: string) => void): Promise<string> {
    const spinner = ora("Indexing project").start();
    const index = await this.indexer.indexWorkspace(this.cwd);
    spinner.succeed(`Indexed ${index.length} files`);
    const search = new SemanticSearch(index);
    const context = search.query(userInput, 4).map((f) => `File: ${f.path}\n${f.content.slice(0, 600)}`).join("\n\n");

    const history = await this.store.recent(10);
    const system: Message = { role: "system", content: this.buildSystemPrompt(context), timestamp: Date.now() };
    const user: Message = { role: "user", content: userInput, timestamp: Date.now() };
    const model = await this.ollama.pickModel(this.config.models.preferred, this.config.models.fallback);

    let output = "";
    for await (const token of this.ollama.streamChat(model, [system, ...history, user], this.config.models.temperature)) {
      output += token;
      onToken(token);
    }

    await this.store.addMessage(user);
    await this.store.addMessage({ role: "assistant", content: output, timestamp: Date.now() });
    return output;
  }

  async runAutonomous(goal: string): Promise<string[]> {
    const steps = this.planner.createPlan(goal);
    const runner = new SandboxExecutor(this.config.sandbox.blockedCommands, this.config.sandbox.requireConfirmation);
    const logs: string[] = [];
    for (const step of steps) {
      step.status = "running";
      logs.push(`STEP ${step.id}: ${step.title}`);
      if (step.id === "3") {
        logs.push(await runner.run("git status --short"));
      }
      step.status = "done";
    }
    return logs;
  }

  private buildSystemPrompt(context: string): string {
    return `You are Dinus Code, autonomous local coding agent. Respect workspace rules.\nRules: ${this.config.workspaceRules.join(" | ")}\nContext:\n${context}`;
  }
}

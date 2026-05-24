import type { DinusConfig } from "../types/index.js";

export const defaultConfig: DinusConfig = {
  profile: "default",
  workspaceRules: ["No destructive filesystem operations without confirmation."],
  sandbox: {
    enabled: true,
    blockedCommands: ["rm -rf /", "mkfs", "shutdown", "reboot", "dd if="],
    requireConfirmation: true
  },
  models: {
    preferred: "qwen3-coder",
    fallback: ["deepseek-coder", "llama3", "codellama", "glm", "mistral"],
    temperature: 0.2,
    contextWindow: 32000
  }
};

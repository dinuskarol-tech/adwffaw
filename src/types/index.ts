export type Role = "system" | "user" | "assistant" | "tool";

export interface Message {
  role: Role;
  content: string;
  timestamp: number;
}

export interface AgentTask {
  id: string;
  objective: string;
  mode: "chat" | "autonomous";
}

export interface PlanStep {
  id: string;
  title: string;
  status: "pending" | "running" | "done" | "failed";
  notes?: string;
}

export interface OllamaModelInfo {
  name: string;
  size?: string;
  modified_at?: string;
}

export interface DinusConfig {
  profile: string;
  workspaceRules: string[];
  sandbox: {
    enabled: boolean;
    blockedCommands: string[];
    requireConfirmation: boolean;
  };
  models: {
    preferred: string;
    fallback: string[];
    temperature: number;
    contextWindow: number;
  };
}

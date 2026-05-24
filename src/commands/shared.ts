import { loadConfig } from "../config/loader.js";
import { DinusAgent } from "../core/agent/dinus-agent.js";

export async function createAgent(cwd: string): Promise<DinusAgent> {
  const config = await loadConfig(cwd);
  const agent = new DinusAgent(config, cwd);
  await agent.init();
  return agent;
}

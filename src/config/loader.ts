import yaml from "js-yaml";
import path from "node:path";
import { defaultConfig } from "./defaults.js";
import { fileExists, readText, writeText } from "../utils/fs.js";
import type { DinusConfig } from "../types/index.js";

export async function loadConfig(cwd: string): Promise<DinusConfig> {
  const configPath = path.join(cwd, "config.yaml");
  if (!(await fileExists(configPath))) {
    await writeText(configPath, yaml.dump(defaultConfig));
    return defaultConfig;
  }
  const raw = await readText(configPath);
  return { ...defaultConfig, ...(yaml.load(raw) as Partial<DinusConfig>) };
}

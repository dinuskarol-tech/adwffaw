import { Command } from "commander";
import path from "node:path";
import { createAgent } from "../commands/shared.js";

export function createProgram(): Command {
  const program = new Command();
  program.name("dinus").description("Dinus Code local AI coding agent");

  program
    .command("chat")
    .argument("<prompt>")
    .action(async (prompt: string) => {
      const agent = await createAgent(process.cwd());
      await agent.runChat(prompt, (t) => process.stdout.write(t));
      process.stdout.write("\n");
    });

  program
    .command("agent")
    .argument("<goal>")
    .action(async (goal: string) => {
      const agent = await createAgent(process.cwd());
      const logs = await agent.runAutonomous(goal);
      console.log(logs.join("\n"));
    });

  ["edit", "explain", "fix", "commit", "review", "terminal", "config"].forEach((name) => {
    program.command(name).argument("[input]").action(async (input = "") => {
      const agent = await createAgent(process.cwd());
      const prompt = `[${name.toUpperCase()}] ${input} in ${path.basename(process.cwd())}`;
      await agent.runChat(prompt, (t) => process.stdout.write(t));
      process.stdout.write("\n");
    });
  });

  return program;
}

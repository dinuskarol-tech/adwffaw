import { execa } from "execa";

export class SandboxExecutor {
  constructor(private blockedCommands: string[], private requireConfirmation: boolean) {}

  isBlocked(command: string): boolean {
    return this.blockedCommands.some((b) => command.includes(b));
  }

  async run(command: string): Promise<string> {
    if (this.isBlocked(command)) {
      throw new Error(`Blocked dangerous command: ${command}`);
    }
    const { stdout, stderr } = await execa({ shell: true })`${command}`;
    return [stdout, stderr].filter(Boolean).join("\n");
  }

  needsConfirmation(): boolean {
    return this.requireConfirmation;
  }
}

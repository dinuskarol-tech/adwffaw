import type { PlanStep } from "../../types/index.js";

export class Planner {
  createPlan(goal: string): PlanStep[] {
    return [
      { id: "1", title: `Analyze objective: ${goal}`, status: "pending" },
      { id: "2", title: "Inspect repository and context", status: "pending" },
      { id: "3", title: "Execute edits and commands", status: "pending" },
      { id: "4", title: "Run validation and summarize", status: "pending" }
    ];
  }
}

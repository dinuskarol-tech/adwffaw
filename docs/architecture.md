# Dinus Code Architecture

## Layers
1. CLI Layer (`commander`) dispatches command intents.
2. Agent Orchestrator executes planning, memory retrieval, and tool routing.
3. Integrations layer (Ollama, SQLite, Git, embeddings).
4. Execution layer with sandbox and command policy.

## Agent Graph (LangGraph-like)
- `PlanNode` -> `RetrieveContextNode` -> `DecideToolNode` -> `ExecuteNode` -> `ReflectNode`.
- Retry edges route failed tool calls back to `DecideToolNode`.

## Core Subsystems
- Session persistence in SQLite.
- Code indexing via Tree-sitter and semantic search.
- Streaming Ollama responses with model fallback.
- Sandbox guardrail with blocked-command policy.

# Dinus Code

Dinus Code to lokalny, terminalowy AI coding agent inspirowany Claude Code, działający na modelach Ollama.

## Funkcje
- Agentic coding + multi-step planning + tryb autonomiczny.
- Repo understanding: indexing Tree-sitter, semantic search, podsumowania projektu.
- Smart editing pipeline: diff preview, patch generation, retry workflow.
- Obsługa modeli Ollama: qwen3-coder, deepseek-coder, llama3, codellama, glm, mistral.
- Sandbox execution: blokowane komendy, scope plików, command confirmation.
- Session memory: historia rozmów i pamięć robocza SQLite.
- TUI-ready (Blessed), streaming odpowiedzi, status modelu.
- Plugin-ready architecture (tool router + subagent hooks + MCP-ready interfaces).

## Instalacja
```bash
npm install
npm run build
npm start -- chat "Przeanalizuj repo"
```

Lub:
```bash
./scripts/install.sh
```

## Komendy
- `dinus chat <prompt>`
- `dinus edit <task>`
- `dinus agent <goal>`
- `dinus explain <target>`
- `dinus fix <issue>`
- `dinus commit <scope>`
- `dinus review <scope>`
- `dinus terminal <command-intent>`
- `dinus config`

## Konfiguracja
`config.yaml` zawiera profile, modele, temperaturę, context window i polityki sandboxa.

## Premium / rozszerzenia
- Voice mode hooks.
- Multimodal image understanding (Ollama vision models).
- Web search + browser automation plugin interfaces.
- MCP support adapters.

## Architektura
Szczegóły: `docs/architecture.md`.

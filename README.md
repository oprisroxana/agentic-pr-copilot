# agentic-pr-copilot

Agentic PR review copilot built for learning practical agent engineering.

## Goal

Analyze a pull request diff and produce:

1. Human-readable review report (`report.md`)
2. Structured machine-readable findings (`report.json`)
The system will evolve from a single-agent reviewer to a multi-agent workflow:
- Reviewer Agent
- Test-Gap Agent
- Security/Performance Agent
- Aggregator Agent

---

## Tech Stack

- Node.js
- TypeScript
- Vitest

---

## Project Structure
txt
src/
agents/
core/
prompts/
adapters/
evals/
expected/
fixtures/
docs/
tests/

---

## Quick Start
bash
npm install
npm run typecheck
npm test
npm run dev
---

## Current Status
- [x] Repo scaffolded
- [ ] MVP spec finalized
- [ ] First reviewer agent implemented
- [ ] Fixture-based eval loop added

---

## Learning Objectives (Agentic Engineering)

- Decompose work into specialized agents
- Use strict I/O contracts (JSON schemas)
- Build plan → act → verify loops
- Add fixture-based evaluations
- Improve reliability and reduce hallucinations
---

## Safety & Scope

- No auto-merge
- No destructive git actions
- No secret handling in prompts or logs
- Minimal, testable changes per iteration

---
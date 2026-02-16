# MVP Spec — PR Copilot Agentic

## Objective

Build a CLI-first tool that reviews a PR diff and outputs:

- `report.json` (structured findings)
- `report.md` (human summary)

This MVP focuses on **analysis quality**, not auto-fixing code.

---

## Inputs
- A unified diff file (e.g. `fixtures/risky-api.diff`)
- Optional metadata (title/description) in future versions

---

## Outputs

### 1) `report.json` (required schema)

json
{
"summary": "string",
"risk_level": "low | medium | high",
"findings": [
{
"type": "breaking_change | test_gap | security | performance | maintainability",
"severity": "low | medium | high",
"file": "string",
"evidence": "string",
"recommendation": "string"
}
],
"next_actions": ["string"]
}
### 2) `report.md`
Human-readable version of the same findings:
- Summary
- Risk level
- Findings table/list
- Prioritized next actions
---

## Required MVP Behavior

1. Parse diff input
2. Generate structured review output (JSON)
3. Render markdown report from JSON
4. Support at least 3 fixture diffs
5. Compare outputs against expected eval files

---

## Definition of Done (MVP)
MVP is complete when all are true:

- Tool runs from CLI with a diff file input
- Produces valid `report.json` matching schema
- Produces readable `report.md`
- Includes 3 fixtures:
- safe refactor
- risky API change
- missing tests
- Includes expected outputs in `evals/expected/`
- Test/eval commands run without manual patching

---

## Non-Goals (for MVP)
- Auto code edits
- GitHub API integration
- Auto comments on PRs
- Autonomous merge decisions

---

## Constraints

- Keep implementation simple and readable
- Avoid unnecessary dependencies
- Prefer deterministic formatting for eval comparability
- No secrets in fixtures, prompts, or logs

---

## Next Phase (Post-MVP)

- Split into multi-agent workflow
- Add security/perf specialist agents
- Add confidence scoring and calibration
- Integrate with GitHub Action
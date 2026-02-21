# PR Review Report

**Risk Level:** high

## Summary
Detected 2 potential issue(s).

## Findings
- **[HIGH] breaking_change** (src/api/user.ts)
 - Evidence: Detected signature-style export change in diff.
 - Recommendation: Confirm backward compatibility and update callers or provide migration notes.
- **[MEDIUM] test_gap** (src/api/user.ts)
 - Evidence: No explicit test file changes found in diff.
 - Recommendation: Add or update tests that cover changed behavior.

## Next Actions
- Address high/medium severity findings first.
- Re-run tests and update documentation if behavior changed.

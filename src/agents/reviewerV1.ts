import { ReviewReport } from "../core/schema";

function extractChangedFiles(diffText: string): string[] {
    const files: string[] = [];
    const regex = /^\+\+\+\s+b\/(.+)$/gm;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(diffText)) !== null) {
        files.push(match[1]);
    }

    return files;
}

export function reviewDiff(diffText: string): ReviewReport {
    // Temporary deterministic baseline logic (replace later with LLM agent call)
    const findings: ReviewReport["findings"] = [];
    const hasFunctionToConstChange =
        /^-\s*export function/m.test(diffText) &&
        /^\+\s*export const/m.test(diffText);

    const changedFiles = extractChangedFiles(diffText);
    const primaryFile = changedFiles[0] ?? "unknown";

    if (hasFunctionToConstChange) {
        findings.push({
            type: "breaking_change",
            severity: "high",
            file: primaryFile,
            evidence: "Detected signature-style export change in diff.",
            recommendation: "Confirm backward compatibility and update callers or provide migration notes."
        });
    }

    if (!diffText.toLowerCase().includes("test")) {
        findings.push({
            type: "test_gap",
            severity: "medium",
            file: primaryFile,
            evidence: "No explicit test changes found in diff.",
            recommendation: "Add or update tests that cover changed behavior."
        });
    }

    const risk_level =
        findings.some(f => f.severity === "high")
            ? "high"
            : findings.some(f => f.severity === "medium")
                ? "medium"
                : "low";

    return {
        summary:
            findings.length === 0
                ? "No major issues detected from baseline heuristic review."
                : `Detected ${findings.length} potential issue(s).`,
        risk_level,
        findings,
        next_actions:
            findings.length === 0
                ? ["Run full test suite and proceed with normal review."]
                : [
                    "Address high/medium severity findings first.",
                    "Re-run tests and update documentation if behavior changed."
                ]
    };
}


import fs from "node:fs";
import path from "node:path";
import { reviewDiff } from "./agents/reviewer";
import { ReviewReport } from "./core/schema";

function ensureDir(filePath: string) {
    const dir = path.dirname(filePath);
    fs.mkdirSync(dir, { recursive: true });
}

function toMarkdown(report: ReviewReport): string {
    const lines: string[] = [];

    lines.push("# PR Review Report", "");
    lines.push(`**Risk Level:** ${report.risk_level}`, "");
    lines.push("## Summary", report.summary, "");

    lines.push("## Findings");
    if (report.findings.length === 0) {
        lines.push("- No findings.");
    } else {
        for (const f of report.findings) {
            lines.push(
                `- **[${f.severity.toUpperCase()}] ${f.type}** (${f.file})`,
                ` - Evidence: ${f.evidence}`,
                ` - Recommendation: ${f.recommendation}`
            );
        }
    }
    lines.push("", "## Next Actions");
    for (const action of report.next_actions) {
        lines.push(`- ${action}`);
    }

    lines.push("");
    return lines.join("\n");
}

function main() {
    const inputDiffPath = process.argv[2];
    const outJson = process.argv[3] ?? "evals/output/report.json";
    const outMd = outJson.replace(/\.json$/, ".md");

    if (!inputDiffPath) {
        console.error("Usage: npm run dev -- <path-to-diff> [output-json-path]");
        process.exit(1);
    }

    const diffText = fs.readFileSync(inputDiffPath, "utf-8");
    const report = reviewDiff(diffText);

    ensureDir(outJson);
    ensureDir(outMd);

    fs.writeFileSync(outJson, JSON.stringify(report, null, 2), "utf-8");
    fs.writeFileSync(outMd, toMarkdown(report), "utf-8");

    console.log(`Wrote ${outJson}`);
    console.log(`Wrote ${outMd}`);
}

main();

// import fs from "node:fs";
// import path from "node:path";
// import { reviewDiff } from "./agents/reviewer";
// import { ReviewReport } from "./core/schema";

// function ensureDir(filePath: string) {
//     const dir = path.dirname(filePath);
//     fs.mkdirSync(dir, { recursive: true });
// }

// function toMarkdown(report: ReviewReport): string {
//     const lines: string[] = [];

//     lines.push("# PR Review Report", "");
//     lines.push(`**Risk Level:** ${report.risk_level}`, "");
//     lines.push("## Summary", report.summary, "");
//     lines.push("## Findings");
//     if (report.findings.length === 0) {
//         lines.push("- No findings.");
//     } else {
//         for (const f of report.findings) {
//             lines.push(
//                 `- **[${f.severity.toUpperCase()}] ${f.type}** (${f.file})`,
//                 ` - Evidence: ${f.evidence}`,
//                 ` - Recommendation: ${f.recommendation}`
//             );
//         }
//     }

//     lines.push("", "## Next Actions");
//     for (const action of report.next_actions) {
//         lines.push(`- ${action}`);
//     }

//     lines.push("");
//     return lines.join("\n");
// }

// function main() {
//     const inputDiffPath = process.argv[2];
//     if (!inputDiffPath) {
//         console.error("Usage: npm run dev -- <path-to-diff>");
//         process.exit(1);
//     }

//     const diffText = fs.readFileSync(inputDiffPath, "utf-8");
//     const report = reviewDiff(diffText);

//     const outJson = "evals/output/report.json";
//     const outMd = "evals/output/report.md";

//     ensureDir(outJson);
//     ensureDir(outMd);

//     fs.writeFileSync(outJson, JSON.stringify(report, null, 2), "utf-8");
//     fs.writeFileSync(outMd, toMarkdown(report), "utf-8");

//     console.log(`Wrote ${outJson}`);
//     console.log(`Wrote ${outMd}`);
// }
// main();
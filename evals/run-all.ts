import { execSync } from "node:child_process";

type Case = {
    name: string;
    fixture: string;
    output: string;
    expected: string;
};

const cases: Case[] = [
    {
        name: "risky-api",
        fixture: "fixtures/risky-api.diff",
        output: "evals/output/risky-api.report.json",
        expected: "evals/expected/risky-api.expected.json"
    },
    {
        name: "safe-refactor",
        fixture: "fixtures/safe-refactor.diff",
        output: "evals/output/safe-refactor.report.json",
        expected: "evals/expected/safe-refactor.expected.json"
    },
    {
        name: "missing-tests",
        fixture: "fixtures/missing-tests.diff",
        output: "evals/output/missing-tests.report.json",
        expected: "evals/expected/missing-tests.expected.json"
    }
];
for (const c of cases) {
    console.log(`\n▶ Running case: ${c.name}`);

    execSync(`npm run dev -- ${c.fixture} ${c.output}`, { stdio: "inherit" });
    execSync(`npm run eval:check -- ${c.output} ${c.expected}`, { stdio: "inherit" });
}

console.log("\n✅ All eval cases passed.");
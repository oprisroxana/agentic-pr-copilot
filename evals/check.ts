import fs from "node:fs";

function readJson(path: string) {
    return JSON.parse(fs.readFileSync(path, "utf-8"));
}

function stableStringify(obj: unknown) {
    return JSON.stringify(obj, null, 2);
}

function main() {
    const actualPath = process.argv[2];
    const expectedPath = process.argv[3];

    if (!actualPath || !expectedPath) {
        console.error("Usage: npm run eval:check -- <actual.json> <expected.json>");
        process.exit(1);
    }

    if (!fs.existsSync(actualPath)) {
        console.error(`Missing actual file: ${actualPath}`);
        process.exit(1);
    }
    if (!fs.existsSync(expectedPath)) {
        console.error(`Missing expected file: ${expectedPath}`);
        process.exit(1);
    }

    const actual = readJson(actualPath);
    const expected = readJson(expectedPath);

    const a = stableStringify(actual);
    const e = stableStringify(expected);

    if (a !== e) {
        console.error("❌ Eval failed: actual output differs from expected.");
        console.error("\n--- ACTUAL ---\n");
        console.error(a);
        console.error("\n--- EXPECTED ---\n");
        console.error(e);
        process.exit(1);
    }

    console.log("✅ Eval passed: output matches expected.");
}

main();
export type RiskLevel = "low" | "medium" | "high";

export type FindingType =
    | "breaking_change"
    | "test_gap"
    | "security"
    | "performance"
    | "maintainability";

export interface Finding {
    type: FindingType;
    severity: RiskLevel;
    file: string;
    evidence: string;
    recommendation: string;
}

export interface ReviewReport {
    summary: string;
    risk_level: RiskLevel;
    findings: Finding[];
    next_actions: string[];
}
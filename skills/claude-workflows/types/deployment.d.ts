/** Local deployment input/output contract, not native Claude SDK types. */
export type Effort = 'low' | 'medium' | 'high' | 'xhigh' | 'max';
export interface Profile { model: string; effort: Effort }
export interface Criterion { id: string; acceptance: string }
export interface Assessment {
  id: string; rationale: string;
  checks: Array<{ id: string; verdict: 'pass' | 'fail' | 'unknown'; evidence: string[] }>;
}
export interface Item { id: string; task: string; acceptance: string }
interface Common {
  goal: string; context: string; scope: string; baseline: string; integration: string;
  controls: { adversarial: boolean; iterate: boolean };
  limits: { maxConcurrent: number; maxCalls: number; maxRounds: number; maxItems: number };
  profiles: { worker: Profile; verifier: Profile; judge: Profile };
}
export type DeploymentInput = Common & (
  | { pattern: 'pipeline'; access: 'read-only' | 'worktree' | 'sequential-write'; items: Item[]; terminal?: never; rubric?: never }
  | { pattern: 'fleet'; access: 'read-only' | 'worktree'; items: Item[]; terminal?: never; rubric?: never }
  | { pattern: 'dynamic'; access: 'read-only' | 'worktree'; discovery: string; items?: never; terminal?: never; rubric?: never }
  | { pattern: 'proposals'; access: 'read-only'; items: Item[]; terminal: 'select' | 'fuse'; rubric: Criterion[]; compactAnswer?: never }
  | { pattern: 'proposals'; access: 'read-only'; items: Item[]; terminal: 'vote'; compactAnswer: true; rubric?: never }
);
export interface Candidate {
  status: 'complete' | 'blocked'; summary: string; evidence: string[];
  artifacts: string[]; answer: string | null;
}
export interface Verification {
  verdict: 'passed' | 'failed' | 'inconclusive'; summary: string;
  evidence: string[]; failedChecks: string[];
}
export interface UnitRecord {
  id: string; status: 'candidate' | 'verified' | 'blocked' | 'missing' | 'failed' | 'not-run';
  rounds: number; output: Candidate | null; check: Verification | null;
  history: Array<{ round: number; output: Candidate; check: Verification | null }>;
}
export type Decision =
  | { terminal: 'vote'; answer: string; support: number; validated: false }
  | { terminal: 'select' | 'fuse'; selectedIds: string[]; summary: string; evidence: string[]; assessments: Assessment[]; validated: false };
export interface DeploymentResult {
  status: 'needs-attention' | 'ready-for-integration';
  reason: string | null; pattern: DeploymentInput['pattern']; calls: number; plannedCalls: number;
  expectedIds: string[]; inventory: Item[]; scheduled: number; failedIds: string[]; records: UnitRecord[];
  decision: Decision | null; verified: boolean;
  integrated: false; globallyAccepted: false;
  requestedProfiles: Common['profiles'];
}

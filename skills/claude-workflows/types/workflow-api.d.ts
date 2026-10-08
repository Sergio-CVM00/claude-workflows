/**
 * Authored, intentionally narrow declaration of the native 2.1.283 script API.
 * Not an official SDK. Reconcile with /workflow-authoring before editing/running.
 */
type WorkflowEffort = 'low' | 'medium' | 'high' | 'xhigh' | 'max';
interface WorkflowAgentOptions {
  label?: string;
  phase?: string;
  schema?: object;
  model?: string;
  effort?: WorkflowEffort;
  isolation?: 'worktree';
  agentType?: string;
}
declare const args: unknown;
declare function agent<T = string>(prompt: string, options?: WorkflowAgentOptions): Promise<T | null>;
declare function parallel<T>(tasks: Array<() => Promise<T>>): Promise<Array<T | null>>;
declare function pipeline<I, A>(items: I[], first: (previous: I, original: I, index: number) => Promise<A>): Promise<Array<A | null>>;
declare function pipeline<I, A, B>(items: I[], first: (previous: I, original: I, index: number) => Promise<A>, second: (previous: A, original: I, index: number) => Promise<B>): Promise<Array<B | null>>;
declare function phase(title: string): void;
declare function log(message: string): void;

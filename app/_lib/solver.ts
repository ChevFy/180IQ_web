export type Expr = { value: number; str: string };

export type Solution = { expr: Expr; diff: number; tier: number };

const EPS = 1e-9;
const TIMEOUT_MS = 5000;

type BinOp = "+" | "-" | "*" | "/" | "^";
type UnOp = "sqrt" | "fact" | "sigma";

type OpSet = {
  bin: Set<BinOp>;
  un: Set<UnOp>;
};

const TIERS: OpSet[] = [
  { bin: new Set<BinOp>(["+", "-", "*", "/"]), un: new Set<UnOp>() },
  { bin: new Set<BinOp>(["+", "-", "*", "/", "^"]), un: new Set<UnOp>() },
  { bin: new Set<BinOp>(["+", "-", "*", "/", "^"]), un: new Set<UnOp>(["sqrt"]) },
  { bin: new Set<BinOp>(["+", "-", "*", "/", "^"]), un: new Set<UnOp>(["sqrt", "fact"]) },
  { bin: new Set<BinOp>(["+", "-", "*", "/", "^"]), un: new Set<UnOp>(["sqrt", "fact", "sigma"]) },
];

function isFullyParenthesized(s: string): boolean {
  if (s.length < 2 || s[0] !== "(" || s[s.length - 1] !== ")") return false;
  let depth = 0;
  for (let i = 0; i < s.length - 1; i++) {
    if (s[i] === "(") depth++;
    else if (s[i] === ")") depth--;
    if (depth === 0 && i < s.length - 1) return false;
  }
  return true;
}

function isAtom(s: string): boolean {
  if (s.length === 1) return true;
  if (isFullyParenthesized(s)) return true;
  return false;
}

function wrap(s: string): string {
  return isAtom(s) ? s : `(${s})`;
}

function factorial(n: number): number {
  let f = 1;
  for (let i = 2; i <= n; i++) f *= i;
  return f;
}

function unaryVariants(e: Expr, depth: number, ops: OpSet, out: Expr[]): void {
  out.push(e);
  if (depth <= 0) return;
  const v = e.value;

  if (ops.un.has("sqrt") && v > 1 && Number.isInteger(v)) {
    const r = Math.sqrt(v);
    if (Number.isInteger(r) && r !== v) {
      unaryVariants({ value: r, str: `√${wrap(e.str)}` }, depth - 1, ops, out);
    }
  }

  if (ops.un.has("fact") && Number.isInteger(v) && v >= 3 && v <= 7) {
    const f = factorial(v);
    unaryVariants({ value: f, str: `${wrap(e.str)}!` }, depth - 1, ops, out);
  }

  if (ops.un.has("sigma") && Number.isInteger(v) && v >= 3 && v <= 60) {
    const s = (v * (v + 1)) / 2;
    if (s !== v) {
      unaryVariants({ value: s, str: `Σ${wrap(e.str)}` }, depth - 1, ops, out);
    }
  }
}

function expand(e: Expr, depth: number, ops: OpSet): Expr[] {
  const out: Expr[] = [];
  unaryVariants(e, depth, ops, out);
  return out;
}

function combineBinary(a: Expr, b: Expr, ops: OpSet): Expr[] {
  const out: Expr[] = [];
  if (ops.bin.has("+")) out.push({ value: a.value + b.value, str: `(${a.str} + ${b.str})` });
  if (ops.bin.has("-")) {
    out.push({ value: a.value - b.value, str: `(${a.str} − ${b.str})` });
    out.push({ value: b.value - a.value, str: `(${b.str} − ${a.str})` });
  }
  if (ops.bin.has("*")) out.push({ value: a.value * b.value, str: `(${a.str} × ${b.str})` });
  if (ops.bin.has("/")) {
    if (Math.abs(b.value) > EPS) {
      const q = a.value / b.value;
      if (Number.isInteger(q)) out.push({ value: q, str: `(${a.str} ÷ ${b.str})` });
    }
    if (Math.abs(a.value) > EPS) {
      const q = b.value / a.value;
      if (Number.isInteger(q)) out.push({ value: q, str: `(${b.str} ÷ ${a.str})` });
    }
  }
  if (ops.bin.has("^")) {
    const tryPow = (x: number, y: number): number | null => {
      if (!Number.isInteger(y) || y < 0 || y > 8) return null;
      if (x === 0 && y === 0) return null;
      const p = Math.pow(x, y);
      if (!Number.isFinite(p) || Math.abs(p) > 1e9) return null;
      if (!Number.isInteger(p)) return null;
      return p;
    };
    const p1 = tryPow(a.value, b.value);
    if (p1 !== null) out.push({ value: p1, str: `(${a.str} ^ ${b.str})` });
    const p2 = tryPow(b.value, a.value);
    if (p2 !== null) out.push({ value: p2, str: `(${b.str} ^ ${a.str})` });
  }
  return out;
}

function now(): number {
  return typeof performance !== "undefined" ? performance.now() : Date.now();
}

type Collector = {
  exact: Map<string, Solution>;
  nearest: Solution;
  nExactWanted: number;
};

function search(
  nums: number[],
  target: number,
  ops: OpSet,
  tier: number,
  deadline: number,
  col: Collector
): boolean {
  const leafDepth = ops.un.size > 0 ? 2 : 0;
  const combineDepth = ops.un.size > 0 ? 1 : 0;
  const initial: Expr[][] = nums.map((n) => expand({ value: n, str: String(n) }, leafDepth, ops));

  let stop = false;

  const record = (e: Expr): void => {
    const diff = Math.abs(e.value - target);
    if (diff < col.nearest.diff) {
      col.nearest = { expr: e, diff, tier };
    }
    if (diff === 0) {
      const key = stripOuterParens(e.str);
      if (!col.exact.has(key)) {
        col.exact.set(key, { expr: e, diff: 0, tier });
        if (col.exact.size >= col.nExactWanted) stop = true;
      }
    }
  };

  const recurse = (exprs: Expr[][]): void => {
    if (stop) return;
    if (now() > deadline) {
      stop = true;
      return;
    }
    if (exprs.length === 1) {
      for (const e of exprs[0]) {
        record(e);
        if (stop) return;
      }
      return;
    }
    for (let i = 0; i < exprs.length && !stop; i++) {
      for (let j = i + 1; j < exprs.length && !stop; j++) {
        const rest: Expr[][] = [];
        for (let k = 0; k < exprs.length; k++) if (k !== i && k !== j) rest.push(exprs[k]);
        const poolA = exprs[i];
        const poolB = exprs[j];
        for (const a of poolA) {
          if (stop) break;
          for (const b of poolB) {
            if (stop) break;
            const combos = combineBinary(a, b, ops);
            for (const c of combos) {
              if (stop) break;
              const expanded = expand(c, combineDepth, ops);
              rest.push(expanded);
              recurse(rest);
              rest.pop();
            }
          }
        }
      }
    }
  };

  for (const pool of initial) for (const e of pool) record(e);
  recurse(initial);
  return col.exact.size >= col.nExactWanted;
}

export function solveTop(nums: number[], target: number, n: number = 5): Solution[] {
  const overallDeadline = now() + TIMEOUT_MS;
  const seed: Solution = {
    expr: { value: nums[0], str: String(nums[0]) },
    diff: Math.abs(nums[0] - target),
    tier: 0,
  };
  const col: Collector = {
    exact: new Map(),
    nearest: seed,
    nExactWanted: n,
  };

  for (let t = 0; t < TIERS.length; t++) {
    if (now() > overallDeadline) break;
    const remaining = overallDeadline - now();
    const tierDeadline = now() + Math.max(500, remaining / (TIERS.length - t));
    const done = search(nums, target, TIERS[t], t, Math.min(tierDeadline, overallDeadline), col);
    if (done) break;
  }

  const exacts = Array.from(col.exact.values()).sort((a, b) => {
    if (a.tier !== b.tier) return a.tier - b.tier;
    return a.expr.str.length - b.expr.str.length;
  });

  if (exacts.length > 0) return exacts.slice(0, n);
  return [col.nearest];
}

export function solve(nums: number[], target: number): { expr: Expr; diff: number } {
  const top = solveTop(nums, target, 1);
  return { expr: top[0].expr, diff: top[0].diff };
}

export function stripOuterParens(s: string): string {
  return isFullyParenthesized(s) ? s.slice(1, -1) : s;
}

import type { ReactNode } from "react";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 text-[11px] font-medium uppercase tracking-widest text-zinc-500 lg:mb-3 dark:text-zinc-400">
        {label}
      </h2>
      {children}
    </section>
  );
}

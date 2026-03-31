import type { PropsWithChildren } from "react";

export function SectionCard({
  title,
  children,
}: PropsWithChildren<{ title: string }>) {
  return (
    <section
      style={{
        borderRadius: 20,
        padding: 20,
        background: "rgba(255,255,255,0.82)",
        border: "1px solid rgba(15, 23, 42, 0.08)",
        boxShadow: "0 12px 40px rgba(15, 23, 42, 0.08)",
      }}
    >
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      {children}
    </section>
  );
}

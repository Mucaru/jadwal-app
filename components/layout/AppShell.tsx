import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
};

/**
 * Container visual utama aplikasi.
 *
 * Responsibilities:
 * - Membatasi lebar aplikasi pada desktop.
 * - Menyediakan background gradient dan decorative blobs.
 * - Menjaga tampilan edge-to-edge pada mobile.
 * - Menyediakan ruang bawah untuk FAB dan safe area.
 *
 * Business logic tidak boleh ditempatkan di komponen ini.
 */
export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-dvh bg-[var(--app-background-secondary)] sm:px-6 sm:py-6">
      <main
        className={[
          "relative isolate mx-auto",
          "min-h-dvh w-full",
          "max-w-[var(--app-shell-max-width)]",
          "overflow-hidden",
          "bg-[var(--app-background)]",
          "sm:min-h-[calc(100dvh-3rem)]",
          "sm:rounded-[2rem]",
          "sm:border sm:border-white/60",
          "sm:shadow-[0_24px_80px_rgba(15,23,42,0.14)]",
        ].join(" ")}
      >
        {/* Base gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20"
          style={{
            background: "var(--app-gradient)",
          }}
        />

        {/* Decorative background blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div
            className={[
              "absolute -left-28 -top-24",
              "h-72 w-72 rounded-full",
              "blur-[80px]",
            ].join(" ")}
            style={{
              background: "var(--blob-primary)",
            }}
          />

          <div
            className={[
              "absolute -right-32 top-[28%]",
              "h-80 w-80 rounded-full",
              "blur-[96px]",
            ].join(" ")}
            style={{
              background: "var(--blob-secondary)",
            }}
          />

          <div
            className={[
              "absolute -bottom-40 left-[12%]",
              "h-96 w-96 rounded-full",
              "blur-[110px]",
            ].join(" ")}
            style={{
              background: "var(--blob-tertiary)",
            }}
          />
        </div>

        {/* Application content */}
        <div
          className={[
            "relative z-10 min-h-dvh",
            "pb-[calc(6rem+env(safe-area-inset-bottom))]",
          ].join(" ")}
        >
          {children}
        </div>
      </main>
    </div>
  );
}

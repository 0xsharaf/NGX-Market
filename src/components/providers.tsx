"use client";

import "@rainbow-me/rainbowkit/styles.css";

import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useState } from "react";
import { WagmiProvider } from "wagmi";
import { arcTestnet } from "@/lib/arc";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

const wagmiConfig =
  projectId && projectId.length >= 8
    ? getDefaultConfig({
        appName: "NGX Synthetic Desk",
        projectId,
        chains: [arcTestnet],
        ssr: true,
      })
    : null;

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());

  if (!wagmiConfig) {
    return (
      <div className="min-h-screen bg-[color:var(--bg)] px-4 py-10 text-[color:var(--fg)]">
        <div className="mx-auto max-w-xl space-y-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-[0_18px_60px_-30px_rgba(0,40,20,0.85)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
            WalletConnect
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">
            Add your WalletConnect project ID
          </h1>
          <p className="text-sm leading-relaxed text-[color:var(--muted)]">
            Copy <code className="rounded bg-[color:var(--accent-soft)] px-1.5 py-0.5 text-[color:var(--accent-2)]">.env.example</code>{" "}
            to <code className="rounded bg-[color:var(--accent-soft)] px-1.5 py-0.5 text-[color:var(--accent-2)]">.env.local</code>{" "}
            and set{" "}
            <code className="rounded bg-[color:var(--accent-soft)] px-1.5 py-0.5 text-[color:var(--accent-2)]">
              NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
            </code>{" "}
            from{" "}
            <a
              className="font-semibold text-[color:var(--accent-2)] underline decoration-[color:var(--ring)] underline-offset-4"
              href="https://cloud.walletconnect.com/"
              target="_blank"
              rel="noreferrer"
            >
              WalletConnect Cloud
            </a>
            , then restart <code className="rounded bg-[color:var(--accent-soft)] px-1.5 py-0.5 text-[color:var(--accent-2)]">npm run dev</code>.
          </p>
        </div>
      </div>
    );
  }

  const theme = darkTheme({
    accentColor: "#6ee7b7",
    accentColorForeground: "#022c1f",
    borderRadius: "large",
    fontStack: "system",
    overlayBlur: "small",
  });

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={theme}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

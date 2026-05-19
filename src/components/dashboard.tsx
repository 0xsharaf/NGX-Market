"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { SYNTHETIC_STOCKS, type SyntheticStock } from "@/lib/stocks";

function formatNgn(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNgnCompact(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(value);
}

type StockCardProps = {
  stock: SyntheticStock;
  connected: boolean;
  onTrade: (side: "buy" | "sell", symbol: string) => void;
};

function StockCard({ stock, connected, onTrade }: StockCardProps) {
  const positive = stock.changePct >= 0;

  return (
    <article className="group relative flex flex-col gap-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-5 shadow-[0_18px_60px_-30px_rgba(0,40,20,0.85)] transition hover:border-[color:var(--ring)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--muted)]">
            Synthetic
          </p>
          <h2 className="mt-1 font-semibold tracking-tight text-[color:var(--fg)] text-xl sm:text-2xl">
            {stock.symbol}
          </h2>
          <p className="mt-1 text-sm text-[color:var(--muted)]">{stock.name}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[color:var(--muted)]">Last</p>
          <p className="font-semibold tabular-nums text-[color:var(--fg)]">
            {formatNgnCompact(stock.priceNgn)}
          </p>
          <p
            className={`mt-1 text-xs font-medium tabular-nums ${
              positive ? "text-[color:var(--gain)]" : "text-[color:var(--loss)]"
            }`}
          >
            {positive ? "+" : ""}
            {stock.changePct.toFixed(2)}%
          </p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-[color:var(--muted)]">
        {stock.description}
      </p>

      {connected ? (
        <p className="text-xs text-[color:var(--muted)]">
          Holdings:{" "}
          <span className="font-semibold text-[color:var(--fg)] tabular-nums">
            {stock.units.toLocaleString("en-NG")} units
          </span>{" "}
          · Value{" "}
          <span className="font-semibold text-[color:var(--fg)] tabular-nums">
            {formatNgnCompact(stock.units * stock.priceNgn)}
          </span>
        </p>
      ) : (
        <p className="text-xs text-[color:var(--muted)]">
          Connect your wallet to surface personalised routing, limits, and demo
          balances for this desk.
        </p>
      )}

      <div className="mt-auto flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => onTrade("buy", stock.symbol)}
          className="inline-flex flex-1 items-center justify-center rounded-xl bg-[color:var(--accent)] px-4 py-2.5 text-sm font-semibold text-[color:var(--accent-fg)] shadow-[0_12px_40px_-18px_rgba(110,231,183,0.55)] transition hover:brightness-110 active:scale-[0.99]"
        >
          Buy
        </button>
        <button
          type="button"
          onClick={() => onTrade("sell", stock.symbol)}
          className="inline-flex flex-1 items-center justify-center rounded-xl border border-[color:var(--accent-2)] bg-transparent px-4 py-2.5 text-sm font-semibold text-[color:var(--accent-2)] transition hover:bg-[color:var(--accent-soft)] active:scale-[0.99]"
        >
          Sell
        </button>
      </div>
    </article>
  );
}

export function Dashboard() {
  const { isConnected, address } = useAccount();
  const [toast, setToast] = useState<string | null>(null);

  const portfolioValue = useMemo(() => {
    return SYNTHETIC_STOCKS.reduce(
      (sum, s) => sum + s.units * s.priceNgn,
      0,
    );
  }, []);

  function handleTrade(side: "buy" | "sell", symbol: string) {
    const label = side === "buy" ? "Buy" : "Sell";
    setToast(`${label} demo queued for ${symbol}. This preview does not move funds.`);
    window.setTimeout(() => setToast(null), 4200);
  }

  const shortAddress =
    address && `${address.slice(0, 6)}…${address.slice(-4)}`;

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-12">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--muted)]">
            NGX synthetic desk
          </p>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--fg)] sm:text-4xl">
              Nigerian synthetic equities
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-[color:var(--muted)] sm:text-base">
              Monitor tokenised exposure to liquid NGX names, review pricing, and
              stage demo trades on{" "}
              <span className="font-medium text-[color:var(--accent-2)]">
                Arc Testnet
              </span>
              . Connect with RainbowKit; gas is paid in USDC per{" "}
              <a
                href="https://docs.arc.io/"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-[color:var(--accent-2)] underline decoration-[color:var(--ring)] underline-offset-2"
              >
                Arc docs
              </a>
              .
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:items-end">
          <div className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-4 text-left shadow-[0_18px_60px_-34px_rgba(0,40,20,0.9)] sm:max-w-sm sm:text-right">
            <p className="text-xs uppercase tracking-wide text-[color:var(--muted)]">
              Portfolio value (demo basket)
            </p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-[color:var(--fg)] sm:text-3xl">
              {formatNgn(portfolioValue)}
            </p>
            <p className="mt-1 text-xs text-[color:var(--muted)]">
              {isConnected
                ? `Linked ${shortAddress} · illustrative NGX synthetic weights.`
                : "Connect a wallet to unlock RainbowKit flows; totals stay illustrative."}
            </p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:items-end">
            <ConnectButton />
          </div>
        </div>
      </header>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {SYNTHETIC_STOCKS.map((stock) => (
          <StockCard
            key={stock.symbol}
            stock={stock}
            connected={isConnected}
            onTrade={handleTrade}
          />
        ))}
      </section>

      {toast ? (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 w-[min(92vw,520px)] -translate-x-1/2 rounded-2xl border border-[color:var(--ring)] bg-[color:var(--card-strong)] px-4 py-3 text-sm text-[color:var(--fg)] shadow-[0_22px_80px_-24px_rgba(0,60,30,0.95)]"
        >
          {toast}
        </div>
      ) : null}
    </div>
  );
}

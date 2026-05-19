
Modern fintech dashboard for Nigerian synthetic equities (sGTCO, sMTNN, sDANGCEM), built with Next.js, Tailwind CSS, and RainbowKit on **Arc Testnet**.

## Stack

- [Next.js](https://nextjs.org/) App Router
- [Tailwind CSS](https://tailwindcss.com/) v4
- [RainbowKit](https://www.rainbowkit.com/) + [wagmi](https://wagmi.sh/) + [viem](https://viem.sh/)
- [Arc Testnet](https://docs.arc.io/) (chain ID `5042002`, USDC gas)

## Setup

```bash
npm install
cp .env.example .env.local
```

Set `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` from [WalletConnect Cloud](https://cloud.walletconnect.com/).

## Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Arc Testnet

| Field | Value |
| --- | --- |
| RPC | `https://rpc.testnet.arc.network` |
| Chain ID | `5042002` |
| Gas token | USDC |
| Explorer | [testnet.arcscan.app](https://testnet.arcscan.app/) |
| Faucet | [faucet.circle.com](https://faucet.circle.com/) |

See [Connect to Arc](https://docs.arc.io/arc/references/connect-to-arc) in the [Arc docs](https://docs.arc.io/).

## Deploy

Build a static-friendly Next app and deploy to Vercel, Netlify, or any Node host:

```bash
npm run build
npm start
```

Ensure `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is set in your host’s environment variables.

## License

MIT

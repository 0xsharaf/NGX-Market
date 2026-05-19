export type SyntheticStock = {
  symbol: string;
  name: string;
  description: string;
  priceNgn: number;
  changePct: number;
  /** Demo units held when wallet is connected */
  units: number;
};

export const SYNTHETIC_STOCKS: SyntheticStock[] = [
  {
    symbol: "sGTCO",
    name: "Guaranty Trust Holding Co.",
    description: "Synthetic NGX exposure to GTCO",
    priceNgn: 52.4,
    changePct: 1.12,
    units: 420,
  },
  {
    symbol: "sMTNN",
    name: "MTN Nigeria",
    description: "Synthetic NGX exposure to MTNN",
    priceNgn: 318.75,
    changePct: -0.38,
    units: 55,
  },
  {
    symbol: "sDANGCEM",
    name: "Dangote Cement",
    description: "Synthetic NGX exposure to DANGCEM",
    priceNgn: 412.3,
    changePct: 0.64,
    units: 30,
  },
];

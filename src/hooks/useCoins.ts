// src/hooks/useCoins.ts
import { useQuery } from "@tanstack/react-query";

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number | null;
  sparkline_in_7d?: { price: number[] };
}

type Params = {
  page: number;
  per_page: number;
  vs_currency: string;
  order: string;
  search?: string;
  includeSparkline?: boolean;
  staleMs?: number;
  refetchMs?: number;
};

const fetchCoins = async (p: Params): Promise<Coin[]> => {
  const url = new URL("https://api.coingecko.com/api/v3/coins/markets");
  url.searchParams.set("vs_currency", p.vs_currency);
  url.searchParams.set("order", p.order);
  url.searchParams.set("per_page", String(p.per_page));
  url.searchParams.set("page", String(p.page));
  url.searchParams.set("sparkline", String(!!p.includeSparkline));
  url.searchParams.set("price_change_percentage", "24h");
  if (p.search) url.searchParams.set("ids", p.search);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch coins");
  return res.json();
};

const useCoins = (params: Params) =>
  useQuery({
    queryKey: ["coins", params],
    queryFn: () => fetchCoins(params),
    staleTime: params.staleMs ?? 30_000,
    refetchInterval: params.refetchMs ?? 30_000,
    placeholderData: (prev) => prev,
  });

export default useCoins;

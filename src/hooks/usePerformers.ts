import type { Coin } from "./useCoins";

const usePerformers = (coins: Coin[]) => {
  const validCoins = coins.filter(
    (coin) => typeof coin.price_change_percentage_24h === "number"
  );

  const topPerformers = [...validCoins].sort(
    (a, b) =>
      (b.price_change_percentage_24h ?? 0) -
      (a.price_change_percentage_24h ?? 0)
  );

  const lowPerformers = [...validCoins].sort(
    (a, b) =>
      (a.price_change_percentage_24h ?? 0) -
      (b.price_change_percentage_24h ?? 0)
  );

  return { topPerformers, lowPerformers };
};

export default usePerformers;

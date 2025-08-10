import { useEffect, useState } from "react";

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

interface Controls {
  limit: number;
  sortBy: string;
  search: string;
  sortKey: string;
  sortDir: string;
  onRequestSort: (key: string) => void;
}

const API_URL = import.meta.env.VITE_API_URL;

const useCoins = ({ limit, sortBy, search }: Controls) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchCoins = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}&order=${sortBy}&per_page=${limit}`);
      const data = await res.json();
      setCoins(data);
    } catch (err) {
      if (err) {
        setError("An unknown error has occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchCoins();

    const intervalId = setInterval(fetchCoins, 30000);

    return () => clearInterval(intervalId);
  }, [limit, sortBy]);

  return { coins: filteredCoins, error, isLoading };
};

export default useCoins;

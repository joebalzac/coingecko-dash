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
}

const API_URL = import.meta.env.VITE_API_URL;

const useCoins = ({ limit }: Controls) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchCoins = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}&per_page=${limit}`);
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

  useEffect(() => {
    fetchCoins();
  }, [limit]);

  return { coins, error, isLoading };
};

export default useCoins;

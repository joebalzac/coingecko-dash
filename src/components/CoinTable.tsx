import useCoins from "../hooks/useCoins";

interface Props {
  limit: number;
}

const CoinTable = ({ limit }: Props) => {
  const { coins, error, isLoading } = useCoins({ limit });

  if (isLoading) return <div>Loading....</div>;
  if (error) return <div>{error}</div>;

  return (
    <table className="min-w-full border border-gray-800 table-auto">
      <thead>
        <tr className="bg-gray-900">
          <th className="p-2 text-left">#</th>
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-left">Marketing Cap</th>
          <th className="p-2 text-left">Price</th>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin, index) => (
          <tr key={coin.id} className="border-t border-gray-900">
            <td className="py-4 text-center">{index + 1}</td>
            <td className="py-4">
              <div className="flex items-center gap-4">
                <img className="h-8 w-8" src={coin.image} alt={coin.name} />
                <div className="flex flex-col">
                  <span>{coin.name}</span>
                  <p className="text-xs">{coin.symbol.toUpperCase()}</p>
                </div>
              </div>
            </td>
            <td className="py-4">${coin.market_cap.toLocaleString()}</td>
            <td className="py-4">${coin.current_price.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CoinTable;

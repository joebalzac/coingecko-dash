import { useState } from "react";
import { FaStar } from "react-icons/fa";
import useCoins from "../hooks/useCoins";
import useFavorites from "../hooks/useFavorites";
import type { SortKey } from "./CoinGrid";
import usePerformers from "../hooks/usePerformers";

interface Props {
  limit: number;
  sortBy: string;
  search: string;
  sortKey: string | null;
  sortDir: "asc" | "desc";
  onRequestSort: (key: string) => void;
}

const CoinTable = ({
  limit,
  sortBy,
  search,
  sortKey,
  sortDir,
  onRequestSort,
}: Props) => {
  const { coins, error, isLoading } = useCoins({
    limit,
    sortBy,
    search,
    sortKey: sortKey ?? "",
    sortDir,
    onRequestSort,
  });
  const { favorites, toggleFavorites } = useFavorites();

  const [activeTab, setActiveTab] = useState<
    "all" | "favorites" | "top-perform" | "low-perform"
  >("all");

  if (isLoading) return <div>Loading....</div>;
  if (error) return <div>{error}</div>;

  const sortedCoins = sortKey
    ? [...coins].sort((a: any, b: any) => {
        const A = a[sortKey];
        const B = b[sortKey];

        if (A == null && B == null) return 0;
        if (A == null) return 1;
        if (B == null) return -1;

        const cmp =
          typeof A === "string" || typeof B === "string"
            ? String(A).localeCompare(String(B), undefined, {
                sensitivity: "base",
              })
            : Number(A) - Number(B);

        return sortDir === "asc" ? cmp : -cmp;
      })
    : coins;

  const { topPerformers, lowPerformers } = usePerformers(sortedCoins);

  const viewCoins =
    activeTab === "all"
      ? sortedCoins
      : activeTab === "favorites"
      ? sortedCoins.filter((c) => favorites.includes(c.id))
      : activeTab === "top-perform"
      ? topPerformers.slice(0, 10)
      : lowPerformers.slice(0, 10);

  const Header = ({
    label,
    keyName,
    align = "text-left",
  }: {
    label: string;
    keyName: SortKey;
    align?: string;
  }) => {
    const active = sortKey === keyName;
    const arrow = !active ? "" : sortDir === "asc" ? "▲" : "▼";
    return (
      <th
        onClick={() => onRequestSort(keyName)}
        className={`p-2 ${align} select-none cursor-pointer`}
        role="button"
        aria-sort={
          active ? (sortDir === "asc" ? "ascending" : "descending") : "none"
        }
        title={`Sort by ${label}`}
      >
        <span className="inline-flex items-center gap-1">
          {label} {arrow && <span className="text-xs">{arrow}</span>}
        </span>
      </th>
    );
  };

  return (
    <>
      {/* Tabs */}
      <div className="flex gap-2 mb-3">
        <button
          className={`cursor-pointer px-3 py-1.5 rounded ${
            activeTab === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-300"
          }`}
          onClick={() => setActiveTab("all")}
        >
          All
        </button>
        <button
          className={`cursor-pointer px-3 py-1.5 rounded ${
            activeTab === "favorites"
              ? "bg-blue-900 text-white"
              : "bg-gray-800 text-gray-300"
          }`}
          onClick={() => setActiveTab("favorites")}
        >
          ⭐ Favorites ({favorites.length})
        </button>
        <button
          className={`cursor-pointer px-3 py-1.5 rounded ${
            activeTab === "top-perform"
              ? "bg-blue-900 text-white"
              : "bg-gray-800 text-gray-300"
          }`}
          onClick={() => setActiveTab("top-perform")}
        >
          Top Performers 🚀 ({topPerformers.length})
        </button>
        <button
          className={`cursor-pointer px-3 py-1.5 rounded ${
            activeTab === "low-perform"
              ? "bg-blue-900 text-white"
              : "bg-gray-800 text-gray-300"
          }`}
          onClick={() => setActiveTab("low-perform")}
        >
          Low Performers 📉 ({lowPerformers.length})
        </button>
      </div>

      {/* Table */}
      <table className="min-w-full border border-gray-800 table-auto">
        <thead>
          <tr className="bg-gray-900">
            <th className="p-2 text-left">Fav</th>
            <th className="p-2 text-left">#</th>
            <Header label="Name" keyName="name" />

            <Header
              label="Market Cap"
              keyName="market_cap"
              align="text-right"
            />
            <Header label="Price" keyName="current_price" align="text-right" />
            <Header
              label="24h %"
              keyName="price_change_percentage_24h"
              align="text-right"
            />
          </tr>
        </thead>

        <tbody>
          {viewCoins.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-6 text-center text-gray-400">
                {activeTab === "favorites"
                  ? "No favorites yet. Click the star in All to add some."
                  : activeTab === "top-perform" || activeTab === "low-perform"
                  ? "No performance data available"
                  : "No results."}
              </td>
            </tr>
          ) : (
            viewCoins.map((coin, index) => {
              const isFav = favorites.includes(coin.id);
              const pct = coin.price_change_percentage_24h;

              return (
                <tr key={coin.id} className="border-t border-gray-900">
                  <td className="py-4 text-center">
                    <FaStar
                      size={18}
                      onClick={() => toggleFavorites(coin.id)}
                      className="cursor-pointer"
                      color={isFav ? "#f59e0b" : "#4b5563"}
                      aria-label={isFav ? "Unfavorite" : "Favorite"}
                      role="button"
                    />
                  </td>
                  <td className="py-4 text-center">{index + 1}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-4">
                      <img
                        className="h-8 w-8"
                        src={coin.image}
                        alt={coin.name}
                      />
                      <div className="flex flex-col">
                        <span>{coin.name}</span>
                        <p className="text-xs">{coin.symbol.toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    ${coin.market_cap.toLocaleString()}
                  </td>
                  <td className="py-4 text-right">
                    ${coin.current_price.toLocaleString()}
                  </td>
                  <td
                    className={`py-4 text-right ${
                      pct == null
                        ? "text-gray-400"
                        : pct > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {pct == null ? "—" : `${pct.toFixed(2)}%`}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </>
  );
};

export default CoinTable;

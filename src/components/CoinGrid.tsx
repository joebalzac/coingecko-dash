import { useState } from "react";
import CoinTable from "./CoinTable";
import LimitSelector from "./LimitSelector";
import SortSelector from "./SortSelector";
import SearchInput from "./SearchInput";

export type SortKey =
  | "name"
  | "symbol"
  | "market_cap"
  | "current_price"
  | "price_change_percentage_24h";

const CoinGrid = () => {
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [search, setSearch] = useState("");

  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const handleRequestSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div className="w-full">
      <div className="pb-8 flex justify-between items-end w-full">
        <SearchInput search={search} onSearchChange={setSearch} />
        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
      </div>

      <CoinTable
        limit={limit}
        sortBy={sortBy}
        search={search}
        sortKey={sortKey}
        sortDir={sortDir}
        onRequestSort={handleRequestSort}
      />
    </div>
  );
};

export default CoinGrid;

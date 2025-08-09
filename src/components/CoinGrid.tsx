import { useState } from "react";
import CoinTable from "./CoinTable";
import LimitSelector from "./LimitSelector";
import SortSelector from "./SortSelector";
import SearchInput from "./SearchInput";

const CoinGrid = () => {
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [search, setSearch] = useState("");

  return (
    <div className="w-full">
      <div className="pb-8 flex  justify-between items-end w-full">
        <SearchInput search={search} onSearchChange={setSearch} />
        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
      </div>

      <CoinTable limit={limit} sortBy={sortBy} search={search} />
    </div>
  );
};

export default CoinGrid;

import { useState } from "react";
import CoinTable from "./CoinTable";
import LimitSelector from "./LimitSelector";
import SortSelector from "./SortSelector";

const CoinGrid = () => {
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("market_cap_desc");

  return (
    <div className="w-full">
      <div className="pb-8 flex items-end w-full">
        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
      </div>

      <CoinTable limit={limit} sortBy={sortBy} />
    </div>
  );
};

export default CoinGrid;

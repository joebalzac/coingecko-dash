import { useState } from "react";
import FilterControls from "./FilterControls";
import CoinTable from "./CoinTable";

const CoinGrid = () => {
  const [limit, setLimit] = useState(10);

  return (
    <div className="w-full">
      <div className="pb-8">
        <FilterControls limit={limit} setLimit={setLimit} />
      </div>

      <CoinTable limit={limit} />
    </div>
  );
};

export default CoinGrid;

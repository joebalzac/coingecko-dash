import type React from "react";

interface Props {
  sortBy: string;
  onSortChange: (value: string) => void;
}

const SortSelector = ({ sortBy, onSortChange }: Props) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(String(e.target.value));
  };

  return (
    <div>
      <select name="" id="sort" value={sortBy} onChange={handleSortChange}>
        <option value="market_cap_desc">Market Cap (High to Low)</option>
        <option value="market_cap_asc">Market Cap (Low to High)</option>
        <option value="volume_desc">Volume (High to Low)</option>
        <option value="volume_asc">Volume (Low to High)</option>
        <option value="id_asc">Name (A to Z)</option>
        <option value="id_desc">Name (Z to A)</option>
      </select>
    </div>
  );
};

export default SortSelector;

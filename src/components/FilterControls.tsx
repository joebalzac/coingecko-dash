interface Props {
  limit: number;
  setLimit: (value: number) => void;
}

const FilterControls = ({ limit, setLimit }: Props) => {
  const handleSelction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
  };

  return (
    <div className="bg-red-300">
      <select value={limit} onChange={handleSelction}>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
    </div>
  );
};

export default FilterControls;

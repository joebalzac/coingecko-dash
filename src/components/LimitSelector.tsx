interface Props {
  limit: number;
  onLimitChange: (value: number) => void;
}

const LimitSelector = ({ limit, onLimitChange }: Props) => {
  const handleSelction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onLimitChange(Number(e.target.value));
  };

  return (
    <div className="bg-gray-950 w-auto">
      <label htmlFor="limit">Show: </label>
      <select value={limit} onChange={handleSelction}>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="50">50</option>
        <option value="75">75</option>
        <option value="100">100</option>
      </select>
    </div>
  );
};

export default LimitSelector;

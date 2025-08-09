interface Props {
  search: string;
  onSearchChange: (bitcoin: string) => void;
}

const SearchInput = ({ search, onSearchChange }: Props) => {
  return (
    <div>
      <input
      className="border border-gray-900"
        value={search}
        type="text"
        placeholder="Search for Bithcoin"
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;

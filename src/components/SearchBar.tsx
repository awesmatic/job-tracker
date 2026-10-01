interface SearchBarProps {
  searchText: string;
  onSearchChange: (text: string) => void; 
}


function SearchBar({ searchText, onSearchChange }: SearchBarProps) {
  return (
    <input
      type="text"
      className="input search-input"
      placeholder="Search by company or job title..."
      value={searchText}
      onChange={(event) => onSearchChange(event.target.value)}
    />
  );
}

export default SearchBar;

import { STATUSES } from "../constants";
import type { FilterOption } from "../types";

interface FilterBarProps {
  selectedStatus: FilterOption;
  onFilterChange: (option: FilterOption) => void;
}

function FilterBar({ selectedStatus, onFilterChange }: FilterBarProps) {
  const options: FilterOption[] = ["All", ...STATUSES];

  return (
    <div className="filter-bar">
      {options.map((option) => (
        <button
          key={option}
          className={selectedStatus === option ? "filter-btn active" : "filter-btn"}
          onClick={() => onFilterChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;

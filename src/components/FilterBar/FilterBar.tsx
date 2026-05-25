import { FilterState } from '@/types/internship';
import { SlidersHorizontalIcon, RotateCcwIcon } from 'lucide-react';
import SearchableSelect from '../UI/SearchableSelect';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onClear: () => void;
  meta: {
    profiles: string[];
    locations: string[];
  };
}

export default function FilterBar({ filters, onFilterChange, onClear, meta }: FilterBarProps) {
  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm space-y-5 sticky top-24">
      <div className="flex items-center justify-between border-b pb-3">
        <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
          <SlidersHorizontalIcon className="h-4 w-4 text-sky-500" />
          Filters
        </h2>
        <button
          onClick={onClear}
          className="text-xs text-sky-500 hover:text-sky-600 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCcwIcon className="h-3 w-3" /> Clear All
        </button>
      </div>

      <SearchableSelect
        label="Profile"
        value={filters.profile}
        options={meta.profiles}
        onChange={(val) => onFilterChange('profile', val)}
        placeholder="Search profiles..."
      />

      <SearchableSelect
        label="Location"
        value={filters.location}
        options={meta.locations}
        onChange={(val) => onFilterChange('location', val)}
        placeholder="Search locations..."
      />

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Max Duration (Months)</label>
        <select
          value={filters.duration}
          onChange={(e) => onFilterChange('duration', e.target.value)}
          className="w-full border border-gray-300 text-sm p-2 rounded focus:outline-none focus:border-sky-500 text-gray-700 bg-white cursor-pointer"
        >
          <option value="All">Any Duration</option>
          <option value="1">1 Month</option>
          <option value="2">2 Months</option>
          <option value="3">3 Months</option>
          <option value="6">6 Months</option>
        </select>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs text-gray-600 font-semibold uppercase">
          <span>Min Stipend (₹)</span>
          <span className="text-sky-500 text-sm lowercase font-bold font-sans">
            {filters.minStipend > 0 ? `₹${filters.minStipend.toLocaleString()}` : 'unpaid'}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="20000"
          step="2000"
          value={filters.minStipend}
          onChange={(e) => onFilterChange('minStipend', parseInt(e.target.value, 10))}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
        />
        <div className="flex justify-between text-[10px] text-gray-400 font-mono">
          <span>₹0</span>
          <span>₹10K</span>
          <span>₹20K+</span>
        </div>
      </div>
    </div>
  );
}

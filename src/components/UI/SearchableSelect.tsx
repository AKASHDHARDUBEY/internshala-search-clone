'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, SearchIcon, CheckIcon, XIcon } from 'lucide-react';

interface SearchableSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchableSelect({
  label,
  value,
  options,
  onChange,
  placeholder = 'Search...',
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  const toggleDropdown = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (!next) {
        setSearch('');
      }
      return next;
    });
  };

  const handleSelect = (opt: string) => {
    onChange(opt);
    setIsOpen(false);
    setSearch('');
  };

  return (
    <div className="space-y-1.5 relative" ref={containerRef}>
      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block">
        {label}
      </label>
      
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full flex items-center justify-between border border-gray-300 rounded-lg p-2.5 text-sm bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all text-left shadow-sm cursor-pointer"
      >
        <span className="truncate">{value || 'Select...'}</span>
        <ChevronDownIcon className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="p-2 border-b border-gray-100 flex items-center gap-1.5 bg-gray-50/50">
            <SearchIcon className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder={placeholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border-0 text-xs focus:outline-none text-gray-700 placeholder-gray-400"
              autoFocus
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="text-gray-400 hover:text-gray-600 p-0.5 rounded-full"
              >
                <XIcon className="h-3 w-3" />
              </button>
            )}
          </div>

          <div className="overflow-y-auto max-h-48 divide-y divide-gray-50">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const isSelected = opt === value;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelect(opt)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-sky-50 text-sky-600 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="truncate">{opt}</span>
                    {isSelected && <CheckIcon className="h-3.5 w-3.5 text-sky-500 shrink-0" />}
                  </button>
                );
              })
            ) : (
              <div className="p-3 text-xs text-gray-400 text-center">No options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

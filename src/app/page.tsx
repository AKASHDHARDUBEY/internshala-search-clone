'use client';

import React, { Suspense } from 'react';
import { useInternships } from '@/hooks/useInternships';
import FilterBar from '@/components/FilterBar/FilterBar';
import InternshipList from '@/components/InternshipList/InternshipList';
import LoadingSkeleton from '@/components/UI/LoadingSkeleton';
import { SearchIcon, BriefcaseIcon } from 'lucide-react';

function DashboardContent() {
  const {
    filteredInternships,
    loading,
    error,
    filters,
    searchQuery,
    uniqueMetadata,
    setSearchQuery,
    updateFilter,
    clearAllFilters,
  } = useInternships();

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-sky-500 p-2 rounded text-white shadow-sm">
              <BriefcaseIcon className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-none">Intern Search</h1>
              <p className="text-xs text-gray-400">Replicating Internshala platform</p>
            </div>
          </div>

          <div className="relative w-full sm:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon className="h-4 w-4 text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search profile, title, company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 text-sm py-2 pl-9 pr-4 rounded-md focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 bg-white text-gray-700"
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <FilterBar
              filters={filters}
              onFilterChange={updateFilter}
              onClear={clearAllFilters}
              meta={uniqueMetadata}
            />
          </div>

          <div className="lg:col-span-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md text-sm mb-4">
                {error}
              </div>
            )}

            {loading ? (
              <LoadingSkeleton />
            ) : (
              <InternshipList
                internships={filteredInternships}
                onReset={clearAllFilters}
                filters={filters}
                searchQuery={searchQuery}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}

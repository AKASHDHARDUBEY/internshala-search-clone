import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Internship, FilterState } from '@/types/internship';
import { fetchAllInternships } from '@/services/internshipApi';
import { matchesSearchKeyword, applyFilterRule } from '@/utils/filterHelpers';

export function useInternships() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    profile: searchParams.get('profile') || 'All',
    location: searchParams.get('location') || 'All',
    duration: searchParams.get('duration') || 'All',
    minStipend: parseInt(searchParams.get('minStipend') || '0', 10),
  });

  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('q') || '');

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.profile !== 'All') params.set('profile', filters.profile);
    if (filters.location !== 'All') params.set('location', filters.location);
    if (filters.duration !== 'All') params.set('duration', filters.duration);
    if (filters.minStipend > 0) params.set('minStipend', filters.minStipend.toString());
    if (searchQuery.trim()) params.set('q', searchQuery.trim());

    router.replace(`?${params.toString()}`);
  }, [filters, searchQuery, router]);

  useEffect(() => {
    let active = true;
    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchAllInternships();
        if (active) {
          setInternships(data);
          setError(null);
        }
      } catch (err: unknown) {
        if (active) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to retrieve internships.';
          setError(errorMessage);
        }
      } finally {
        if (active) setLoading(false);
      }
    }
    loadData();
    return () => { active = false; };
  }, []);

  const filteredInternships = useMemo(() => {
    return internships.filter((item) => {
      const matchKey = matchesSearchKeyword(item, searchQuery);
      const matchFilters = applyFilterRule(item, filters);
      return matchKey && matchFilters;
    });
  }, [internships, filters, searchQuery]);

  const uniqueMetadata = useMemo(() => {
    const profiles = new Set<string>();
    const locations = new Set<string>();

    internships.forEach((item) => {
      if (item.profile_name) profiles.add(item.profile_name);
      item.location_names.forEach((loc) => {
        if (loc) locations.add(loc);
      });
    });

    return {
      profiles: ['All', ...Array.from(profiles)],
      locations: ['All', ...Array.from(locations)],
    };
  }, [internships]);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setFilters({ profile: 'All', location: 'All', duration: 'All', minStipend: 0 });
    setSearchQuery('');
  };

  return {
    internships,
    filteredInternships,
    loading,
    error,
    filters,
    searchQuery,
    uniqueMetadata,
    setSearchQuery,
    updateFilter,
    clearAllFilters,
  };
}

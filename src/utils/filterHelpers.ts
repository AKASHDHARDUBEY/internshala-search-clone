import { Internship, FilterState } from '@/types/internship';

export function matchesSearchKeyword(item: Internship, query: string): boolean {
  if (!query) return true;
  const target = query.toLowerCase().trim();
  return (
    item.title.toLowerCase().includes(target) ||
    item.company_name.toLowerCase().includes(target) ||
    item.profile_name.toLowerCase().includes(target) ||
    item.location_names.some(loc => loc.toLowerCase().includes(target))
  );
}

export function applyFilterRule(item: Internship, filters: FilterState): boolean {
  if (filters.profile && filters.profile !== 'All') {
    const cleanItemProfile = item.profile_name.toLowerCase();
    const cleanFilterProfile = filters.profile.toLowerCase();
    if (!cleanItemProfile.includes(cleanFilterProfile)) return false;
  }

  if (filters.location && filters.location !== 'All') {
    const cleanFilterLoc = filters.location.toLowerCase().trim();
    const matchesLocation = item.location_names.some((loc) => 
      loc.toLowerCase().trim() === cleanFilterLoc
    );
    if (!matchesLocation) return false;
  }

  if (filters.duration && filters.duration !== 'All') {
    const filterDurInt = parseInt(filters.duration, 10);
    const itemDurInt = parseInt(item.duration, 10);
    if (!isNaN(filterDurInt) && !isNaN(itemDurInt)) {
      if (itemDurInt > filterDurInt) return false;
    }
  }

  const itemStipendAmt = item.stipend?.numericMinStipend || 0;
  if (filters.minStipend > 0 && itemStipendAmt < filters.minStipend) {
    return false;
  }

  return true;
}

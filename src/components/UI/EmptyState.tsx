import { InboxIcon } from 'lucide-react';

interface EmptyStateProps {
  onClear: () => void;
}

export default function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-4 border border-dashed border-gray-200 bg-white rounded-lg shadow-sm">
      <InboxIcon className="mx-auto h-12 w-12 text-gray-400 mb-3" />
      <h3 className="text-lg font-medium text-gray-900">No Internships Found</h3>
      <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
        We couldn&apos;t find any roles that match your search terms or applied filters.
      </p>
      <button
        onClick={onClear}
        className="mt-4 px-4 py-2 bg-sky-500 hover:bg-sky-600 transition-colors text-white font-medium text-sm rounded cursor-pointer"
      >
        Reset Filters
      </button>
    </div>
  );
}

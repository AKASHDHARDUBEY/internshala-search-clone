export default function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3].map((n) => (
        <div key={n} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2 w-2/3">
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-100 rounded w-1/2"></div>
            </div>
            <div className="h-10 w-10 bg-gray-100 rounded"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-3 gap-2 py-2">
            <div className="h-3 bg-gray-100 rounded col-span-1"></div>
            <div className="h-3 bg-gray-100 rounded col-span-1"></div>
            <div className="h-3 bg-gray-100 rounded col-span-1"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded w-1/4 self-end ml-auto"></div>
        </div>
      ))}
    </div>
  );
}

import { Internship } from '@/types/internship';
import { MapPinIcon, CalendarIcon, WalletIcon, ExternalLinkIcon, PlayCircleIcon } from 'lucide-react';

interface CardProps {
  internship: Internship;
}

export default function InternshipCard({ internship }: CardProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 space-y-4 relative group">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1 text-[11px] font-medium border px-2 py-0.5 rounded bg-sky-50 text-sky-600 border-sky-100">
            <PlayCircleIcon className="h-3.5 w-3.5" /> Actively hiring
          </div>
          <h3 className="text-lg font-bold text-gray-800 leading-tight group-hover:text-sky-600 transition-colors">
            {internship.title}
          </h3>
          <p className="text-sm font-medium text-gray-500">{internship.company_name}</p>
        </div>
        
        <div className="h-10 w-10 bg-gray-50 flex items-center justify-center text-xs font-extrabold text-sky-500 border rounded">
          {internship.company_name.substring(0, 2).toUpperCase()}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 text-sm text-gray-600">
        {internship.location_names.map((loc) => (
          <span key={loc} className="inline-flex items-center gap-1 bg-gray-100 px-2.5 py-1 rounded text-xs text-gray-700">
            <MapPinIcon className="h-3 w-3 text-gray-500" /> {loc}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 border-t border-b border-gray-50 py-3 text-sm">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block">START DATE</span>
          <span className="text-gray-700 font-medium">{internship.start_date}</span>
        </div>
        <div>
          <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block">DURATION</span>
          <span className="text-gray-700 font-medium flex items-center gap-1">
            <CalendarIcon className="h-3.5 w-3.5 text-gray-400" />
            {internship.duration}
          </span>
        </div>
        <div>
          <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block">STIPEND</span>
          <span className="text-gray-700 font-medium flex items-center gap-1">
            <WalletIcon className="h-3.5 w-3.5 text-gray-400" />
            {internship.stipend.salary}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs pt-2">
        <span className="text-gray-400 font-mono">ID: {internship.id}</span>
        <button className="text-sky-500 hover:text-sky-600 font-semibold inline-flex items-center gap-1 border border-sky-500 px-3.5 py-1.5 rounded bg-transparent hover:bg-sky-50 transition-all cursor-pointer">
          Apply Now <ExternalLinkIcon className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Internship, FilterState } from '@/types/internship';
import InternshipCard from '../InternshipCard/InternshipCard';
import EmptyState from '../UI/EmptyState';

interface ListProps {
  internships: Internship[];
  onReset: () => void;
  filters?: FilterState;
  searchQuery?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring' as const, stiffness: 260, damping: 25 } 
  }
};

export default function InternshipList({ internships, onReset, filters, searchQuery }: ListProps) {
  if (internships.length === 0) {
    return <EmptyState onClear={onReset} />;
  }

  const summaryParts: string[] = [];
  if (filters && filters.profile !== 'All') {
    summaryParts.push(filters.profile);
  }
  if (searchQuery && searchQuery.trim()) {
    summaryParts.push(`matching "${searchQuery.trim()}"`);
  }

  const profileAndSearch = summaryParts.join(' ');
  const locationText = filters && filters.location !== 'All' ? `in ${filters.location}` : '';

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold text-gray-500">
          Showing <span className="text-gray-800 font-bold">{internships.length}</span> opportunities
          {profileAndSearch && (
            <span>
              {" for "}
              <span className="text-sky-500 font-semibold">{profileAndSearch}</span>
            </span>
          )}
          {locationText && (
            <span>
              {" "}
              <span className="text-sky-500 font-semibold">{locationText}</span>
            </span>
          )}
        </p>
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {internships.map((internship) => (
          <motion.div key={internship.id} variants={itemVariants}>
            <InternshipCard internship={internship} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export interface StipendDetails {
  salary: string;
  salary_type: string;
  currency: string;
  numericMinStipend?: number; // Clean helper field we will inject
}

export interface Internship {
  id: number;
  title: string;
  company_name: string;
  location_names: string[];
  duration: string;
  stipend: StipendDetails;
  start_date: string;
  profile_name: string;
  is_active: boolean;
}

// Global filter state representation
export interface FilterState {
  profile: string;
  location: string;
  duration: string;
  minStipend: number;
}

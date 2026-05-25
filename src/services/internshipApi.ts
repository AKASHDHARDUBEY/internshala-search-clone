import axios from 'axios';
import { Internship } from '@/types/internship';

export async function fetchAllInternships(): Promise<Internship[]> {
  const response = await axios.get('/api/internships');
  if (response.data && response.data.success) {
    return response.data.data;
  }
  throw new Error('Could not successfully retrieve list of internships.');
}

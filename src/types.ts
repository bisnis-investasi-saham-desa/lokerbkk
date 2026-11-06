export interface JobItem {
  id: string;
  title: string;
  location: string;
  company: string;
  salary?: string;
  type: string; // 'Full-time' | 'Kontrak BKK' | 'Magang Industri' | 'Prakerin'
  source: string;
  snippet: string;
  description?: string;
  link?: string;
  updated: string;
  bkkSchool?: string;
  bkkCity?: string;
  requirements?: string[];
  jurusanSMK?: string[];
  genderRequirement?: 'Pria' | 'Wanita' | 'Pria / Wanita';
  minHeight?: { male?: number; female?: number };
  maxAge?: number;
  isVerifiedBKK: boolean;
  selectionStages?: string[];
}

export interface BKKSchool {
  id: string;
  slug: string;
  name: string;
  city: string;
  province: string;
  npsn: string;
  address: string;
  verifiedKemnaker: boolean;
  industryPartners: string[];
  contactPerson: string;
  phone: string;
  activeRecruitmentsCount: number;
  description: string;
}

export interface BKKGuide {
  id: string;
  slug: string;
  title: string;
  category: 'Psikotes' | 'Tes Fisik' | 'Medical Check Up' | 'Alur Rekrutmen' | 'Tips Interview';
  readTime: string;
  summary: string;
  content: string[];
  keywords: string[];
  lastUpdated: string;
}

export interface JobCategory {
  slug: string;
  name: string;
  count: number;
  iconName: string;
  description: string;
  jurusanRelevan: string[];
}

export interface SearchParams {
  keywords: string;
  location: string;
}

export interface JoobleApiResponse {
  totalCount: number;
  jobs: Array<{
    id: string;
    title: string;
    location: string;
    snippet: string;
    salary?: string;
    source?: string;
    type?: string;
    link?: string;
    company?: string;
    updated?: string;
  }>;
}

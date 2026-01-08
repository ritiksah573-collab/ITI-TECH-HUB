
export interface Note {
  id: string;
  title: string;
  subject: string;
  branch: string;
  semester: string;
  link: string;
  // Added to support direct PDF download links from cloud database
  downloadUrl?: string;
}

export interface SiteConfig {
  siteName: string;
  heroTitle: string;
  heroSubTitle: string;
  marqueeUpdates: string[];
  logoUrl?: string;
  primaryColor?: string;
  aboutText?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
}

export interface AdminProfile {
  username: string;
  password: string;
}

export interface ContactLead {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Course {
  id: number;
  title: string;
  provider: string;
  duration: string;
  price: string;
  category: string;
  image: string;
}

export interface ForumPost {
  id: number;
  author: string;
  title: string;
  category: string;
  replies: number;
  views: number;
  timeAgo: string;
}
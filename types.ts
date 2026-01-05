
export interface Note {
  id: string;
  title: string;
  subject: string;
  branch: string;
  semester: string;
  link: string;
}

export interface SiteConfig {
  heroTitle: string;
  heroSubTitle: string;
  marqueeUpdates: string[];
  logoUrl?: string;
  primaryColor?: string;
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

// Added Course interface to resolve build error in pages/Skills.tsx
export interface Course {
  id: number;
  title: string;
  provider: string;
  duration: string;
  price: string;
  category: string;
  image: string;
}

// Added ForumPost interface to resolve build error in pages/Community.tsx
export interface ForumPost {
  id: number;
  author: string;
  title: string;
  category: string;
  replies: number;
  views: number;
  timeAgo: string;
}

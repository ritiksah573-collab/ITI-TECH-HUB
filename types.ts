export interface Note {
  id: number;
  title: string;
  subject: string;
  branch: string;
  semester: string;
  downloadUrl: string;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: 'Government' | 'Private' | 'Apprenticeship';
  postedDate: string;
  tags: string[];
}

export interface Course {
  id: number;
  title: string;
  provider: string;
  duration: string;
  price: string;
  image: string;
  category: string;
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

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

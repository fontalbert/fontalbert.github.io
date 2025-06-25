export interface Profile {
    _id?: string;
    name: string;
    title: string;
    email: string;
    phone?: string;
    location?: string;
    summary: string;
    avatar?: string;
    social?: {
      linkedin?: string;
      github?: string;
      twitter?: string;
      portfolio?: string;
    };
    languages?: Array<{
      name: string;
      level: string;
    }>;
  }
  
  export interface Experience {
    _id?: string;
    type: 'work' | 'education';
    company: string;
    position: string;
    location?: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    description?: string;
    achievements?: string[];
    technologies?: string[];
    logo?: string;
  }
  
  export interface Project {
    _id?: string;
    title: string;
    description: string;
    shortDescription: string;
    type: 'personal' | 'professional';
    status: 'completed' | 'in-progress' | 'planned';
    startDate?: string;
    endDate?: string;
    technologies: string[];
    features?: string[];
    images?: string[];
    thumbnail?: string;
    demoUrl?: string;
    githubUrl?: string;
    liveUrl?: string;
    featured?: boolean;
  }
  
  export interface Skill {
    _id?: string;
    category: string;
    name: string;
    level: number;
    yearsOfExperience?: number;
    icon?: string;
    color?: string;
  }
export interface StudentProfile {
  id: string;
  name: string;
  age: number;
  year: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior' | 'Transfer' | 'Graduate';
  major: string;
  pronouns: string;
  bio: string;
  classes: string[];
  interests: string[];
  studyStyle: string;
  matchScore: number;
  imageUrl: string;
  hasLikedUser: boolean; // Determines if it's a match when user swipes right
  socials?: {
    discord?: string;
    instagram?: string;
  };
}

export interface Match {
  id: string;
  profileId: string;
  timestamp: number;
  profile: StudentProfile;
}

export type SwipeDirection = 'left' | 'right';

export type ViewState = 'home' | 'matches' | 'profile';

export interface Animal {
  id: string;
  name: string;
  species: string;
  personality: string;
  description: string;
  avatar_url: string;
  created_at: string;
}

export interface Photo {
  id: string;
  animal_id: string;
  title: string;
  story: string;
  image_url: string;
  likes_count: number;
  created_at: string;
}

export interface Story {
  id: string;
  animal_id: string;
  title: string;
  content: string;
  cover_image: string;
  views_count: number;
  created_at: string;
}

export interface Comment {
  id: string;
  story_id: string;
  visitor_name: string;
  content: string;
  created_at: string;
}

export interface DataContextType {
  animals: Animal[];
  photos: Photo[];
  stories: Story[];
  comments: Comment[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  addAnimal: (animal: Omit<Animal, 'id' | 'created_at'>) => Promise<Animal>;
  addPhoto: (photo: Omit<Photo, 'id' | 'created_at' | 'likes_count'>) => Promise<Photo>;
  addStory: (story: Omit<Story, 'id' | 'created_at' | 'views_count'>) => Promise<Story>;
  addComment: (comment: Omit<Comment, 'id' | 'created_at'>) => Promise<Comment>;
  updateAnimal: (id: string, updates: Partial<Animal>) => Promise<Animal>;
  updatePhoto: (id: string, updates: Partial<Photo>) => Promise<Photo>;
  updateStory: (id: string, updates: Partial<Story>) => Promise<Story>;
  deleteAnimal: (id: string) => Promise<void>;
  deletePhoto: (id: string) => Promise<void>;
  deleteStory: (id: string) => Promise<void>;
  deleteComment: (id: string) => Promise<void>;
}

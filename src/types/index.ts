export type LearningLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';

export type ResourceCategory =
  | 'Basics'
  | 'Introductory Courses'
  | 'Advanced Courses'
  | 'Tutorials'
  | 'Articles and Blogs'
  | 'Books'
  | 'Frameworks, Libraries, and SDKs'
  | 'Communities'
  | 'Podcasts'
  | 'Talks';

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  level: LearningLevel;
  url: string;
  imageQuery: string;
  imageUrl?: string;
}

import { IUserProfile } from './profile.interface';

export interface IArticle {
  author: IUserProfile;
  body: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
  createAt: string;
}

import { IArticle } from '@shared/types/article.interface';

export interface IArticleState {
  isLoading: boolean;
  data: IArticle | null;
  error: string | null;
}

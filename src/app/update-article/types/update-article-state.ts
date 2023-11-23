import { IBackendErrors } from '@auth/types/backendErrors.interface';
import { IArticle } from '@shared/types/article.interface';

export interface IUpdateArticleState {
  isLoading: boolean;
  article: IArticle | null;
  isSubmitting: boolean;
  validationErrors: IBackendErrors | null;
}

import { IBackendErrors } from '@auth/types/backendErrors.interface';

export interface ICreateArticleState {
  isSubmitting: boolean;
  validationErrors: IBackendErrors | null;
}

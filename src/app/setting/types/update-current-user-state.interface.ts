import { IBackendErrors } from '@auth/types/backendErrors.interface';

export interface ISettingsState {
  isSubmitting: boolean;
  validationErrors: IBackendErrors | null;
}

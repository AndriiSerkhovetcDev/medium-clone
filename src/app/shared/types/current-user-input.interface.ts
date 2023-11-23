import { ICurrentUser } from '@shared/types/currentUser.interface';

export interface ICurrentUserInput extends ICurrentUser {
  password: string;
}

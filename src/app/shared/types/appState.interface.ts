import { IAuthState } from '@auth/types/authState.interface';
import { IFeedState } from '../modules/feed/types/feed-state.interface';

export interface IAppState {
  auth: IAuthState;
  feed: IFeedState
}

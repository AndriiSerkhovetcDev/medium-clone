import { IAuthState } from '@auth/types/authState.interface';
import { IFeedState } from '../modules/feed/types/feed-state.interface';
import { IPopularTagsState } from '@shared/modules/popular-tags/types/popular-tags-state.interface';
import { IArticleState } from '@app/article/types/article-state.interface';

export interface IAppState {
  auth: IAuthState;
  feed: IFeedState;
  tags: IPopularTagsState;
  article: IArticleState;
}

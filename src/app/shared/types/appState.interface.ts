import { IAuthState } from '@auth/types/authState.interface';
import { IFeedState } from '../modules/feed/types/feed-state.interface';
import { IPopularTagsState } from '@shared/modules/popular-tags/types/popular-tags-state.interface';
import { IArticleState } from '@app/article/types/article-state.interface';
import { ICreateArticleState } from '@app/create-article/types/create-article-state.interface';
import { IUpdateArticleState } from '@app/update-article/types/update-article-state';
import { ISettingsState } from '@app/setting/types/update-current-user-state.interface';

export interface IAppState {
  article: IArticleState;
  auth: IAuthState;
  createArticle: ICreateArticleState;
  feed: IFeedState;
  settings: ISettingsState;
  tags: IPopularTagsState;
  updateArticle: IUpdateArticleState;
}

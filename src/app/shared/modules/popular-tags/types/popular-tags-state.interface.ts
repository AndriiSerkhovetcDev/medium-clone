import { PopularTagType } from '@shared/types/popularTag.type';

export interface IPopularTagsState {
  isLoading: boolean;
  error: string | null;
  tags: PopularTagType[] | null;
}

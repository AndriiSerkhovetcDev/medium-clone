import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PopularTagType } from '@shared/types/popularTag.type';

@Component({
  selector: 'mc-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagListComponent {
  @Input('tags') tagsProps: PopularTagType[];
}

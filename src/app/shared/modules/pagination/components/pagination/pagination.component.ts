import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { UtilsService } from '@app/shared/services/utils/utils.service';

@Component({
  selector: 'mc-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit {
  @Input('total') totalProps: number;
  @Input('limit') limitProps: number;
  @Input('currentPage') currentPage: number;
  @Input('url') urlProps: string;

  public pageCount: number;
  public pages: number[];

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.pageCount = Math.ceil(this.totalProps / this.limitProps);
    this.pages = this.utilsService.range(1, this.pageCount);
  }
}

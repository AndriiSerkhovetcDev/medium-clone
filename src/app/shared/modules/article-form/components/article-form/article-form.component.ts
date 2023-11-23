import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IArticleInput } from '@shared/types/article-input.interface';
import { IBackendErrors } from '@auth/types/backendErrors.interface';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'mc-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleFormComponent implements OnInit {
  @Input('initialValue') initialValuesProps: IArticleInput;
  @Input('isSubmitting') isSubmittingProps: boolean;
  @Input('errors') errorsProps: IBackendErrors | null;

  @Output('articleSubmit') articleSubmitEvent =
    new EventEmitter<IArticleInput>();

  public form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      title: this.initialValuesProps.title,
      description: this.initialValuesProps.description,
      body: this.initialValuesProps.body,
      tagList: this.initialValuesProps.tagList.join(', '),
    });
  }

  public onSubmit(): void {
    const articleInput: IArticleInput = {
      ...this.form.value,
      tagList: this.form.value.tagList.split(','),
    };
    this.articleSubmitEvent.emit(articleInput);
  }
}

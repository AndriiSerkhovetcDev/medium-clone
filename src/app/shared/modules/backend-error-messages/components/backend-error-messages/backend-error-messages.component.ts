import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IBackendErrors } from '@auth/types/backendErrors.interface';

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backend-error-messages.component.html',
  styleUrls: ['./backend-error-messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input('backendErrors') backendErrorsProps: IBackendErrors;

  public errorMessages: string[];

  ngOnInit() {
    this.errorMessages = Object.keys(this.backendErrorsProps).map(
      (name: string) => {
        const messages = this.backendErrorsProps[name].join(', ');
        return `${name} ${messages}`;
      },
    );
  }
}

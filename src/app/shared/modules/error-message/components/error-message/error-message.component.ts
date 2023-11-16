import { Component, Input } from '@angular/core';

@Component({
  selector: 'mc-error-message',
  template: `<div>{{ errorMessageProps }}</div>`,
})
export class ErrorMessageComponent {
  @Input('errorMessage') errorMessageProps: string = 'Something went wrong'

}

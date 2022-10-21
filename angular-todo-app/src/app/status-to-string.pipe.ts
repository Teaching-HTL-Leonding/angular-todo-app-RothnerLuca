import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusToStringPipe'
})
export class StatusToStringPipe implements PipeTransform {

  transform(status: boolean, ...args: unknown[]): string {
    return status ? 'Done' : 'Undone';
  }

}

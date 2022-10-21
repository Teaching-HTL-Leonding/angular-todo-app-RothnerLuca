import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyPersonToDashPipe'
})
export class EmptyPersonToDashPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value === '' ? '-' : value;
  }

}

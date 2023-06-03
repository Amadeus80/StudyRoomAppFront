import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeRol'
})
export class RemoveRolPipe implements PipeTransform {

  transform(value: string): string {
    return value.split("_")[1];
  }

}

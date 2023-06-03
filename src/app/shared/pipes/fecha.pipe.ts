import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let fecha:Date = new Date(value);
    let mesNumber:number = fecha.getMonth();
    let mes:string = mesNumber.toString();
    if(mesNumber < 10){
      mes = `0${mesNumber.toString()}`;
    }
    let horaNumber:number = fecha.getHours();
    let hora:string = horaNumber.toString();
    if(horaNumber < 10){
      hora = `0${horaNumber}`
    }

    let minutoNumber:number = fecha.getMinutes();
    let minuto:string = minutoNumber.toString();
    if(minutoNumber < 10){
      minuto = `0${minutoNumber}`
    }
    let fechaString:string = `${fecha.getDate()}-${mes}-${fecha.getFullYear()} ${hora}:${minuto}`
    return fechaString;
  }

}

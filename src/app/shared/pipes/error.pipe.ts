import { Pipe, PipeTransform } from '@angular/core';

const erorres:any = {
  "401":"Credenciales incorrectas",
  "0": "No se ha podido procesar la solicitud"
} 

@Pipe({
  name: 'error'
})
export class ErrorPipe implements PipeTransform {


  transform(value: string, ...args: unknown[]): string {
    const partes:string[] = value.split(":");
    const cod_estado = value.substring(value.lastIndexOf(":")+1).trim().split(" ")[0];
    return erorres[cod_estado];
  }

}

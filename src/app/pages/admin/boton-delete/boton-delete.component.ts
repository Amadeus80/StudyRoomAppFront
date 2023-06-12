import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-boton-delete',
  templateUrl: './boton-delete.component.html',
  styleUrls: ['./boton-delete.component.css']
})
export class BotonDeleteComponent {
  @Output() propagar = new EventEmitter();
  @Input() id!:string;

  constructor(){}

  //Propaga el borrado de usuario
  borrar(){
    this.propagar.emit(this.id);
  }
}

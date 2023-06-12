import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-boton-edit',
  templateUrl: './boton-edit.component.html',
  styleUrls: ['./boton-edit.component.css']
})
export class BotonEditComponent {
  @Output() propagar = new EventEmitter();
  @Input() id!:string;

  constructor(){}

  //Función que propaga el editar de usuario
  editar(){
    this.propagar.emit(this.id);
  }
}

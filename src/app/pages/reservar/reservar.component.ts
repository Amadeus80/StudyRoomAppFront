import { Component, OnInit } from '@angular/core';
import { ReservarService } from './reservar.service';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {

  constructor(private reservarService:ReservarService) {}

  fechaActual:any = new Date();
  fechaHoy:string = `${this.fechaActual.getFullYear()}-${('0'+(this.fechaActual.getMonth()+1)).slice(-2)}-${this.fechaActual.getDate()}`;
  asientos:any;

  ngOnInit(): void{
    this.reservarService.listadoAsientos(this.fechaHoy).subscribe(
      {
        next:(data) => {
          this.asientos = data;
          console.log(this.asientos);
        },
        error:(error) => {
          console.log(error)
        }
      }
    )
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  isLogged = false;
  successMensaje:any=null;
  
  constructor(public authService: AuthService){}

  ngOnInit(): void {
    if(localStorage.getItem("success")){
      this.successMensaje = localStorage.getItem("success");
      Swal.fire({
        icon: 'success',
        title: this.successMensaje,
        showConfirmButton: true,
      })
      localStorage.removeItem("success");
      this.successMensaje = null;
    }
    this.subscription.add(
      this.authService.isLogged.subscribe((resp) => (this.isLogged = resp))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

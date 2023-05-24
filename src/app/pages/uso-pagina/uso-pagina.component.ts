import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-uso-pagina',
  templateUrl: './uso-pagina.component.html',
  styleUrls: ['./uso-pagina.component.css']
})
export class UsoPaginaComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  isLogged = false;
  
  constructor(public authService: AuthService){}

  ngOnInit(): void {
    this.subscription.add(
      this.authService.isLogged.subscribe((resp) => (this.isLogged = resp))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

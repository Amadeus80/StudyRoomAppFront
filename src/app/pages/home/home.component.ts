import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

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

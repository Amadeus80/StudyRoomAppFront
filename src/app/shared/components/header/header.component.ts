import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAdmin: boolean = true;
  private subscription: Subscription = new Subscription();
  isLogged = false;
  ruta!:string;

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(public authService: AuthService, private router:Router) {}

  ngOnInit(): void {
    this.subscription.add(
      this.authService.isLogged.subscribe((resp) => (this.isLogged = resp))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  obtenerRuta():string{
    return this.router.url;
  }
}

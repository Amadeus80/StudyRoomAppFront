import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/app/shared/models/user.interface';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  errorLogin: boolean = false;
  private subscription: Subscription = new Subscription();

  loginForm = this.fb.group({
    email: [''],
    password: [''],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLogin(): void {
    const formValue = this.loginForm.value;
    const authData: User = {
      email: formValue.email!,
      password: formValue.password!,
    };
    this.subscription.add(
      this.authService.login(authData).subscribe({
        next: (resp) => {
          if (resp) {
            this.router.navigate(['']);
          }
        },
        error: (e) => (this.errorLogin = true),
      })
    );
  }
}

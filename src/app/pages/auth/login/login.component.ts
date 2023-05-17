import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user.interface';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  errorLogin: boolean = false;
  errorMessage!:string;
  private subscription: Subscription = new Subscription();

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLogin(): void {
    if (this.loginForm.valid) {
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
          error: (e) => {
            this.errorLogin = true;
            this.errorMessage = e;
          },
        })
      );
    } else{
      this.snackBar.open("Algún campo no es válido", "X", {
        duration: 3000,
        horizontalPosition: "center",
        verticalPosition: "bottom",
      });
    }
  }
}

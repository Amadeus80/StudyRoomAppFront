import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCreate } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy{
  errorLogin: boolean = false;
  errorMessage!:string;
  private subscription: Subscription = new Subscription();

  registerForm = this.fb.group({
    email: [''],
    username:[''],
    password: [''],
  });

  constructor(private authService:AuthService, private fb:FormBuilder, private router:Router){}
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onRegister():void{
    const formValue = this.registerForm.value;
    const registerData:UserCreate = {
      email : formValue.email!,
      username : formValue.username!,
      password:formValue.password!
    }
    this.subscription.add(
      this.authService.register(registerData).subscribe({
        next: (resp) => {
          this.router.navigate(["/login"])
        },
        error : (e) => {
          this.errorLogin = true;
          this.errorMessage = e;
        }
      })
    )
  }
}

// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}


  login(): void {
     this.authService.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/admin/']),
      error: (error: any) => this.handleLoginError(error)
    });
  }

  handleLoginError(error: any): void {
    switch (error.code) {
      case 'auth/user-not-found':
        this.errorMessage = 'No user found with this email.';
        break;
      case 'auth/wrong-password':
        this.errorMessage = 'Incorrect password.';
        break;
      case 'auth/invalid-email':
        this.errorMessage = 'Invalid email format.';
        break;
      default:
        this.errorMessage = 'Login failed. Please try again.';
    }
  }
}

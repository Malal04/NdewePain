import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLogin } from '../../_interface/user';
import { AuthService } from '../../_service/auth.service';
import { TokenService } from '../../_service/token.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../_enum/dtos';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login: UserLogin[] = [];
  loginForm!: FormGroup;
  message: string = '';

  constructor(
    private fb: FormBuilder , 
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log("response login", response);
  
          this.tokenService.setToken(response.token);
          this.tokenService.setRefreshToken(response.refreshToken);
  
          if (response.role) { 
            this.tokenService.setRole(response.role);
          }
          if (response.role === Role.ADMIN) {
            this.router.navigate(['dashboard']);
          } else if (response.role === Role.CLIENT) {
            this.router.navigate(['/']);
          }
          
        },
        error: () => {
          this.message = 'Login ou mot de passe incorrect';
          setTimeout(() => this.message = '', 2000);
        }
      });
    }
  }

}

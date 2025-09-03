import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../_service/auth.service';
import { TokenService } from '../../_service/token.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountState, Role } from '../../_enum/dtos';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm!: FormGroup;
  message: string | null = null;
  error: string | null = null;
  loading = false;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      profile: [null],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      role: [Role.CLIENT],
      accountState: [AccountState.ACTIVED]
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }


  onSubmit() {
    if (this.registerForm.invalid) {
      this.error = 'Veuillez remplir correctement le formulaire.';
      return;
    }

    const formData = new FormData();
    const formValue = this.registerForm.value;
    
    Object.keys(formValue).forEach(key => {
      if (key !== 'profil') {
        formData.append(key, formValue[key]);
      }
    });
    
    if (this.selectedFile) {
      formData.append('profil', this.selectedFile);
    }

    this.loading = true;
    this.error = null;
  
    this.authService.register(formData).subscribe({
      next: (res) => {
        this.message = "Utilisateur inscrit avec succès !";
        this.loading = false;
        setTimeout(() => this.router.navigate(['auth/login']), 1500);
      },
      error: (err) => {
        this.error = err.error?.message || 'Erreur lors de l\'inscription.';
        this.loading = false;
      }
    });
  }

}

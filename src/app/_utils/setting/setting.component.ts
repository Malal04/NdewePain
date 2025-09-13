import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { AuthService } from '../../_service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {
  avatarUrl: string = "https://i.pravatar.cc/100";
  avatarFile: File | null = null;
  message: string | null = null;

  profile = {
    nom: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: ""
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.me().subscribe({
      next: (res: any) => {
        console.log('Profil utilisateur', res);
        this.profile.nom = res.user.nom;
        this.profile.email = res.user.email;
        this.profile.phone = res.user.phone;
        if (res.user.profil) {
          this.avatarUrl = res.user.profil; 
        }
      },
      error: (err) => {
        console.error("Erreur récupération profil", err);
      }
    });
  }

  onAvatarChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.avatarFile = input.files[0];
      const reader = new FileReader();
      reader.onload = e => this.avatarUrl = e.target?.result as string;
      reader.readAsDataURL(input.files[0]);
    }
  }

  saveProfile() {
    const formData = new FormData();

    formData.append('nom', this.profile.nom);
    formData.append('email', this.profile.email);
    formData.append('phone', this.profile.phone);

    if (this.profile.password) {
      formData.append('password', this.profile.password);
      formData.append('password_confirmation', this.profile.password_confirmation);
    }

    if (this.avatarFile) {
      formData.append('profil', this.avatarFile); 
    }

    this.authService.updateProfile(formData).subscribe({
      next: (res) => {
        alert("Profil mis à jour avec succès ");
        this.router.navigate(['/profil']);
        setTimeout(() => this.message = '', 2000);
        console.log(res);
      },
      error: (err) => {
        console.error("Erreur lors de la mise à jour", err);
      }
    });
  }

}

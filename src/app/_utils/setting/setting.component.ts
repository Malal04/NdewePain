import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

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

  profile = {
    fullname: "Jean Dupont",
    email: "jean.dupont@boulangerie.com",
    phone: "+221 77 123 45 67",
    address: "123 Rue du Pain, Dakar",
    password: ""
  };

  onAvatarChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = e => this.avatarUrl = e.target?.result as string;
      reader.readAsDataURL(input.files[0]);
    }
  }

  saveProfile() {
    alert("✅ Profil mis à jour avec succès !");
    console.log(this.profile);
  }

}

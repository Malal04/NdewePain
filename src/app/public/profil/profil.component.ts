import { Component } from '@angular/core';
import { HeaderComponent } from "../../_utils/header/header.component";
import { FooterComponent } from "../../_utils/footer/footer.component";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [
    HeaderComponent, 
    FooterComponent,
    FormsModule,
    CommonModule
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  updateProfile() {
    console.log('Mettre à jour le profil');
    this.router.navigate(['/setting']);
  }

}

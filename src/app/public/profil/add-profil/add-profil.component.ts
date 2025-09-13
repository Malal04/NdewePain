import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdresseService } from '../../../_service/adresse.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../../_utils/header/header.component";
import { FooterComponent } from "../../../_utils/footer/footer.component";

@Component({
  selector: 'app-add-profil',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HeaderComponent,
    FooterComponent
],
  templateUrl: './add-profil.component.html',
  styleUrl: './add-profil.component.css'
})
export class AddProfilComponent {
  adresseForm!: FormGroup;
  loading = false;
  message = '';
  success = false;

  constructor(
    private fb: FormBuilder,
    private adresseService: AdresseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.adresseForm = this.fb.group({
      ligne_adresse: ['', [Validators.required, Validators.minLength(5)]],
      ville: ['', Validators.required],
      code_postal: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      pays: ['Sénégal', Validators.required],
      est_principale: [false],
      type: ['maison'],
      mode_livraison: ['livraison']
    });
  }

  onSubmit(): void {
    if (this.adresseForm.invalid) {
      this.message = "Veuillez remplir correctement tous les champs obligatoires.";
      this.success = false;
      return;
    }

    this.loading = true;
    this.adresseService.create(this.adresseForm.value).subscribe({
      next: (res) => {
        this.message = res.message || "Adresse ajoutée avec succès";
        this.success = true;
        this.loading = false;
        this.adresseForm.reset({
          pays: 'Sénégal',
          est_principale: false,
          type: 'maison',
          mode_livraison: 'livraison'
        });
        this.router.navigate(['/profil']);
        setTimeout(() => this.message = '', 2000);
      },
      error: () => {
        this.message = "Une erreur est survenue lors de l'ajout de l'adresse.";
        this.success = false;
        this.loading = false;
        setTimeout(() => this.message = '', 2000);
      }
    });
  }

  retourne(): void {
    this.router.navigate(['/profil']);
  }

}

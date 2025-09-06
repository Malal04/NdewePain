import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Category } from '../../../_interface/category';
import { ProduitService } from '../../../_service/produit.service';
import { CategoryService } from '../../../_service/category.service';
import { Status } from '../../../_enum/dtos';
import { Produit } from '../../../_interface/produit';

@Component({
  selector: 'app-edit-produit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './edit-produit.component.html',
  styleUrl: './edit-produit.component.css'
})
export class EditProduitComponent {
  categories: Category[] = [];
  produitForm!: FormGroup;
  message: string = '';
  produitId!: number;
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private produitService: ProduitService,
    private categorieService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.produitId = Number(this.route.snapshot.paramMap.get('id'));
    this.initializeForm();
    this.getCategorie();
    this.getProduit();
  }

  private initializeForm(): void {
    this.produitForm = this.formBuilder.group({
      categorie_id: ['', Validators.required],
      nom: ['', [Validators.required, Validators.maxLength(255)]],
      description: [''],
      prix_unitaire: [0, [Validators.required, Validators.min(0)]],
      stock: [0],
      status: [Status.ACTIVE, Validators.required],
      photo_url: [null],
      allergenes: this.formBuilder.array([]),
    });
  }

  private getCategorie(): void {
    this.categorieService.getAll().subscribe({
      next: (data) => {
        this.categories = data.data;
      },
      error: () => {
        this.message = 'Erreur lors de la récupération des catégories';
      },
    });
  }

  private getProduit(): void {
    this.produitService.getById(this.produitId).subscribe({
      next: (response) => {
        console.log("Produit récupéré", response);
        const produit = Array.isArray(response.data) ? response.data : response.data;
        if (!produit) {
          console.error('Aucune donnée produit reçue');
          return;
        }
        this.setFormValues(produit);
      },
      error: () => {
        this.message = 'Erreur lors de la récupération du produit';
      },
    });
  }

  private setFormValues(produit: Produit): void {
    this.produitForm.patchValue({
      categorie_id: produit?.categorie?.id ?? '',
      nom: produit.nom ?? '',
      description: produit.description ?? '',
      prix_unitaire: produit.prix_unitaire ?? 0,
      stock: produit.stock ?? 0,
      status: produit.status ?? Status.ACTIVE,
      photo_url: produit.photo_url ?? null,
      allergenes: produit.allergenes ?? [],
    });    

    this.clearAllergenes(); 

    if (produit.allergenes && Array.isArray(produit.allergenes)) {
      produit.allergenes.forEach((allergene: string) => {
        this.addAllergeneFromAPI(allergene); 
      });
    }
  }

  private addAllergeneFromAPI(allergene: string): void {
    this.allergenesFormArray.push(this.formBuilder.control(allergene, Validators.maxLength(255)));
  }
  
  private clearAllergenes(): void {
    while (this.allergenesFormArray.length) {
      this.allergenesFormArray.removeAt(0);
    }
  }

  get allergenesFormArray() {
    return this.produitForm.get('allergenes') as FormArray;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.produitForm.patchValue({ photo_url: this.selectedFile });
    }
  }
  
  addAllergene(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();
    if (event.key === 'Enter' && value) {
      event.preventDefault();
      if (value.length <= 255) {
        this.allergenesFormArray.push(this.formBuilder.control(value, Validators.maxLength(255)));
      }
      input.value = '';
    }
  }
  

  removeAllergene(index: number): void {
    this.allergenesFormArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.produitForm.valid) {
      const formData = new FormData();
      Object.entries(this.produitForm.value).forEach(([key, value]) => {
        if (key === 'allergenes') {
          (value as string[]).forEach((a) => formData.append('allergenes[]', a)); 
        } else if (key === 'photo_url' && this.selectedFile) {
          formData.append('photo_url', this.selectedFile);
        } else if (value !== null && value !== undefined) {
          formData.append(key, value as any);
        }
      });
      console.log("formData", formData);

      console.log("Produit à envoyer", formData );
  
      this.produitService.update(this.produitId, formData).subscribe({
        next: () => {
          this.message = 'Produit mis à jour avec succès';
          this.router.navigate(['/dashboard/index-produit']);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du produit:', error);
          this.message = 'Erreur lors de la mise à jour du produit';
        }
      });
    }
  }
  

  onCancel(): void {
    this.router.navigate(['/dashboard/index-produit']);
  }

}

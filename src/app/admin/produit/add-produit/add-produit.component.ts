import { CommonModule } from '@angular/common';
import { 
  Component,
  ElementRef,
  ViewChild
 } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../_interface/category';
import { ProduitService } from '../../../_service/produit.service';
import { CategoryService } from '../../../_service/category.service';
import { Router } from '@angular/router';
import { Status } from '../../../_enum/dtos';


@Component({
  selector: 'app-add-produit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './add-produit.component.html',
  styleUrl: './add-produit.component.css'
})
export class AddProduitComponent {
  categories: Category[] = [];
  message: string = '';
  produitForm!: FormGroup;
  allergenes: string[] = [];
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private produitService: ProduitService,
    private categorieService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.produitForm = this.formBuilder.group({
      categorie_id: ['', Validators.required],
      nom: ['', [Validators.required, Validators.maxLength(255)]],
      description: [''],
      prix_unitaire: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.min(0)]],
      status: [ Status.ACTIVE, Validators.required],
      photo_url: [null ],
      allergenes: this.formBuilder.array([])
    });

    this.getCategorie();
  }

  get allergenesFormArray(): FormArray {
    return this.produitForm.get('allergenes') as FormArray;
  }

  getCategorie(): void {
    this.categorieService.getAll().subscribe({
      next: (data) => {
        this.categories = data.data;
      },
      error: () => {
        this.message = 'Erreur lors de la récupération des catégories';
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.produitForm.patchValue({ photo_url: this.selectedFile });
    }
  }

  addAllergene(event: KeyboardEvent ): void {
    console.log("event", event);
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();
    if (event.key === 'Enter' && value) {
      event.preventDefault();
      if (value.length <= 255) {
        this.allergenes.push(value);
        this.allergenesFormArray.push(this.formBuilder.control(value, Validators.maxLength(255)));
      }
      input.value = '';
    }
  }

  removeAllergene(index: number): void {
    this.allergenes.splice(index, 1);
    this.allergenesFormArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.produitForm.valid) {
      const formData = new FormData();
      Object.entries(this.produitForm.value).forEach(([key, value]) => {
        if (key === 'allergenes') {
          (value as string[]).forEach((a, i) => formData.append(`allergenes[${i}]`, a));
        } else if (key === 'photo_url' && this.selectedFile) {
          formData.append('photo_url', this.selectedFile);
        } else if (value !== null && value !== undefined) {
          formData.append(key, value as any);
        }
      });
      console.log("formData", this.produitForm.valid);
      this.produitService.create(formData).subscribe({
        
        next: () => {
          this.message = 'Produit créé avec succès';
          this.router.navigate(['/dashboard/index-produit']);
        },
        error: () => {
          this.message = 'Erreur lors de la création du produit';
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/index-produit']);
  }

}

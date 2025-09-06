import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SupplierService } from '../../../../_service/supplier.service';

@Component({
  selector: 'app-edit-supplier',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-supplier.component.html',
  styleUrl: './edit-supplier.component.css'
})
export class EditSupplierComponent implements OnInit {
  supplierForm!: FormGroup;
  supplierId!: number;
  message: string = '';
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private supplierService: SupplierService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.supplierForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(255)]],
      contact_person: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      telephone: ['', [Validators.maxLength(20)]],
      adresse: ['', [Validators.maxLength(500)]],
    });

    this.supplierId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (this.supplierId) {
      this.getSupplier();
    }
  }

  getSupplier(): void {
    this.supplierService.getById(this.supplierId).subscribe({
      next: (data) => {
        console.log( "supplier", data);
        this.supplierForm.patchValue({
          nom: data.data?.nom,
          contact_person: data.data?.contact_person,
          email: data.data?.email,
          telephone: data.data?.telephone,
          adresse: data.data?.adresse,
        });
      },
      error: () => {
        this.error = "Impossible de charger le fournisseur.";
      }
    });
  }

  onSubmit(): void {
    if (this.supplierForm.invalid) return;

    console.log( "supplier", this.supplierForm.value);

    this.supplierService.update(this.supplierId, this.supplierForm.value).subscribe({

      next: () => {  
        this.message = "Fournisseur mis à jour avec succès";
        setTimeout(() => {
          this.router.navigate(['/dashboard/index-ingredient']);
        }, 1500);
      },
      error: (err) => {
        this.error = err.error?.message || "Erreur lors de la mise à jour du fournisseur.";
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/dashboard/index-ingredient']);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SupplierService } from '../../../../_service/supplier.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-supplier',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './add-supplier.component.html',
  styleUrl: './add-supplier.component.css'
})
export class AddSupplierComponent  implements OnInit {
  supplierForm!: FormGroup;
  message: string = '';


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private supplierService: SupplierService,
  ) {}

  ngOnInit(): void {
    this.supplierForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(255)]],
      contact_person: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      telephone: ['', [Validators.maxLength(20)]],
      adresse: ['', [Validators.maxLength(500)]],
    });
  }

  onSubmit(): void {
    if (this.supplierForm.valid) {
      console.log('Formulaire envoyé : ', this.supplierForm.value);
      this.supplierService.create(this.supplierForm.value).subscribe({
        next: () => this.router.navigate(['/dashboard/index-ingredient']),
        error: () => {
          this.message = "Impossible d'ajouter le fournisseur.";
          setTimeout(() => this.message = '', 3000);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/dashboard/index-ingredient']);
  }

}

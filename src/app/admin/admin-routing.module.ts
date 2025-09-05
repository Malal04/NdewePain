import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { IndexProduitComponent } from './produit/index-produit/index-produit.component';
import { AddProduitComponent } from './produit/add-produit/add-produit.component';
import { IndexCategoryComponent } from './category/index-category/index-category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { EditProduitComponent } from './produit/edit-produit/edit-produit.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { IndexIngredientComponent } from './inventoty/ingredient/index-ingredient/index-ingredient.component';

const routes: Routes = [
  {
    path: '', component: DashbordComponent, children:[
      { 
        path: '', redirectTo: 'menu', pathMatch: 'full' 
      },
      { 
        path: 'menu', component: MainComponent
      },
      // Produit
      {
        path: 'index-produit', component: IndexProduitComponent
      },
      {
        path: 'add-produit', component: AddProduitComponent
      },
      {
        path: 'edit-produit/:id', component: EditProduitComponent
      },  
      // Categorie
      {
        path: 'index-categorie', component: IndexCategoryComponent
      },
      {
        path: 'add-categorie', component: AddCategoryComponent
      },
      {
        path: 'edit-categorie/:id', component: EditCategoryComponent
      },
      // Ingredient
      {
        path: 'index-ingredient', component: IndexIngredientComponent
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

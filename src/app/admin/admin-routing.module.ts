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
import { AddSupplierComponent } from './inventoty/supplier/add-supplier/add-supplier.component';
import { IndexStockComponent } from './inventoty/stock/index-stock/index-stock.component';
import { AddStockComponent } from './inventoty/stock/add-stock/add-stock.component';
import { AddIngredientComponent } from './inventoty/ingredient/add-ingredient/add-ingredient.component';
import { EditSupplierComponent } from './inventoty/supplier/edit-supplier/edit-supplier.component';
import { EditIngredientComponent } from './inventoty/ingredient/edit-ingredient/edit-ingredient.component';
import { MoveStockComponent } from './inventoty/stock/move-stock/move-stock.component';
import { EditStockComponent } from './inventoty/stock/edit-stock/edit-stock.component';
import { HistoryStockComponent } from './inventoty/stock/history-stock/history-stock.component';

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
      },
      {
        path: 'add-ingredient', component: AddIngredientComponent
      },
      {
        path: 'edit-ingredient/:id', component: EditIngredientComponent
      },
      // Supplier
      {
        path: 'add-supplier', component: AddSupplierComponent
      },
      {
        path: 'edit-supplier/:id', component: EditSupplierComponent
      },
      // Stock
      {
        path: 'index-stock', component: IndexStockComponent
      },
      {
        path: 'add-stock', component: AddStockComponent
      },
      {
        path: 'move-stock', component: MoveStockComponent
      },
      {
        path: 'edit-stock/:id', component: EditStockComponent
      },
      {
        path: 'history-stock/:id', component: HistoryStockComponent
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

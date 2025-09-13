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
import { IndexCommandeComponent } from './inventoty/commande/index-commande/index-commande.component';
import { AddCommandeComponent } from './inventoty/commande/add-commande/add-commande.component';
import { EditCommandeComponent } from './inventoty/commande/edit-commande/edit-commande.component';
import { AddPromotionComponent } from './promotion/add-promotion/add-promotion.component';
import { IndexPromotionComponent } from './promotion/index-promotion/index-promotion.component';
import { EditPromotionComponent } from './promotion/edit-promotion/edit-promotion.component';
import { IndexOrdreComponent } from './ordre/index-ordre/index-ordre.component';
import { AddOrdreComponent } from './ordre/add-ordre/add-ordre.component';
import { IndexEmployerComponent } from './employer/index-employer/index-employer.component';
import { AddEmployerComponent } from './employer/add-employer/add-employer.component';
import { MesEmployerComponent } from './employer/mes-employer/mes-employer.component';
import { RapportsComponent } from './rapports/rapports.component';
import { PerformancesComponent } from './performances/performances.component';
import { ProductionComponent } from './production/production.component';

const routes: Routes = [
  {
    path: '', component: DashbordComponent, children:[
      { 
        path: '', redirectTo: 'menu', pathMatch: 'full' 
      },
      { 
        path: 'menu', component: MainComponent
      },
      // Rapports
      {
        path: 'rapports', component: RapportsComponent
      },
      // Performances
      {
        path: 'performances', component: PerformancesComponent
      },
      // Production
      {
        path: 'production', component: ProductionComponent
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
      },
      // Commande Stock
      {
        path: 'index-commande-stock', component: IndexCommandeComponent
      },
      {
        path: 'add-commande-stock', component: AddCommandeComponent
      },
      {
        path: 'edit-commande-stock/:id', component: EditCommandeComponent
      },
      // promotion 
      {
        path: 'add-promotion', component: AddPromotionComponent
      },
      {
        path: 'index-promotion', component: IndexPromotionComponent
      },
      {
        path: 'edit-promotion/:id', component: EditPromotionComponent
      },
      // ordre commande
      {
        path: 'index-ordre', component: IndexOrdreComponent
      },
      {
        path: 'add-ordre/:id', component: AddOrdreComponent
      },
      // ordre commande
      {
        path: 'index-employer', component: IndexEmployerComponent
      },
      {
        path: 'add-employer', component: AddEmployerComponent
      },
      {
        path: 'mes-employer', component: MesEmployerComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { ConditionsComponent } from './conditions/conditions.component';
import { ConfidentialiteComponent } from './confidentialite/confidentialite.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ProfilComponent } from './profil/profil.component';
import { PromotionComponent } from './promotion/promotion.component';
import { MenuComponent } from './menu/menu.component';
import { DetailsComponent } from './details/details.component';
import { SettingComponent } from '../_utils/setting/setting.component';

const routes: Routes = [
  { 
    path: '', redirectTo: 'home', pathMatch: 'full' 
  },
  { 
    path: 'home', component: HomeComponent 
  },
  { 
    path: 'delivery', component: DeliveryComponent 
  },
  { 
    path: 'conditions', component: ConditionsComponent 
  },
  {
    path: 'confidentialite', component: ConfidentialiteComponent
  },
  {
    path: 'gallery', component: GalleryComponent
  },
  {
    path: 'profil', component: ProfilComponent
  },
  {
    path: 'promotion', component: PromotionComponent
  },
  {
    path: 'menu', component: MenuComponent
  },
  {
    path: 'details', component: DetailsComponent
  },
  {
    path: 'chechout', loadChildren: () => import('./pagnier/pagnier.module').then(m => m.PagnierModule)
  },
  {
    path: 'setting', component: SettingComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }

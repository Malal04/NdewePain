import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChechoutComponent } from './chechout/chechout.component';
import { OrdreComponent } from './ordre/ordre.component';
import { PaymentComponent } from './payment/payment.component';
import { SupportComponent } from './support/support.component';
import { MesCommandeComponent } from './mes-commande/mes-commande.component';
import { DetailCommandeComponent } from './detail-commande/detail-commande.component';
import { FacturationComponent } from './facturation/facturation.component';

const routes: Routes = [
    { 
      path: '', redirectTo: 'cart', pathMatch: 'full' 
    },
    { 
      path: 'cart', component: ChechoutComponent
    },
    { 
      path: 'ordre/:id', component: OrdreComponent
    },
    { 
      path: 'payment', component: PaymentComponent
    },
    { 
      path: 'support', component: SupportComponent
    },
    {
      path: 'mescommandes', component: MesCommandeComponent
    },
    {
      path: 'detailcommandes/:id', component: DetailCommandeComponent
    },
    {
      path: 'facturation/:id', component: FacturationComponent
    }
    
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagnierRoutingModule { }

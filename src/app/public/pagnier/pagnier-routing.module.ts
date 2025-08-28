import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChechoutComponent } from './chechout/chechout.component';
import { OrdreComponent } from './ordre/ordre.component';
import { PaymentComponent } from './payment/payment.component';
import { SupportComponent } from './support/support.component';

const routes: Routes = [
    { 
      path: '', redirectTo: 'cart', pathMatch: 'full' 
    },
    { 
      path: 'cart', component: ChechoutComponent
    },
    { 
      path: 'ordre', component: OrdreComponent
    },
    { 
      path: 'payment', component: PaymentComponent
    },
    { 
      path: 'support', component: SupportComponent
    },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagnierRoutingModule { }

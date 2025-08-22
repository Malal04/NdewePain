import { Component } from '@angular/core';
import { HeaderComponent } from "../../_utils/header/header.component";
import { FooterComponent } from "../../_utils/footer/footer.component";

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.css'
})
export class DeliveryComponent {

}

import { Component } from '@angular/core';
import { FooterComponent } from "../../_utils/footer/footer.component";
import { HeaderComponent } from "../../_utils/header/header.component";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent
],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

}

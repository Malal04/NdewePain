import { Component } from '@angular/core';
import { HeaderComponent } from "../../_utils/header/header.component";
import { FooterComponent } from "../../_utils/footer/footer.component";

@Component({
  selector: 'app-confidentialite',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './confidentialite.component.html',
  styleUrl: './confidentialite.component.css'
})
export class ConfidentialiteComponent {

}

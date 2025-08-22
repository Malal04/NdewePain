import { Component } from '@angular/core';
import { HeaderComponent } from "../../_utils/header/header.component";
import { FooterComponent } from "../../_utils/footer/footer.component";

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {

}

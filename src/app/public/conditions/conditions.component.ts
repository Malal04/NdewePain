import { Component } from '@angular/core';
import { HeaderComponent } from "../../_utils/header/header.component";
import { FooterComponent } from "../../_utils/footer/footer.component";

@Component({
  selector: 'app-conditions',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './conditions.component.html',
  styleUrl: './conditions.component.css'
})
export class ConditionsComponent {

}

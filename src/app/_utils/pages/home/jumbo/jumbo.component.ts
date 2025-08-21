import { Component } from '@angular/core';
import { AdminRoutingModule } from "../../../../admin/admin-routing.module";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-jumbo',
  standalone: true,
  imports: [
    AdminRoutingModule,
    RouterLink
  ],
  templateUrl: './jumbo.component.html',
  styleUrl: './jumbo.component.css'
})
export class JumboComponent {

}

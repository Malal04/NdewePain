import { Component } from '@angular/core';
import { AdminRoutingModule } from "../../admin/admin-routing.module";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    AdminRoutingModule,
    RouterLink
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }  

}

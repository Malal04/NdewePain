import { Component } from '@angular/core';
import { AdminRoutingModule } from "../../admin/admin-routing.module";
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { AuthService } from '../../_service/auth.service';
import { TokenService } from '../../_service/token.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    AdminRoutingModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuOpen = false;
  isLoggedIn = false;
  user: any;
  

  constructor(
    private auth: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.auth.me().subscribe({
      next: (res: any) => {
        console.log('profile', res);
        this.user = res.user; 
      },
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  isAuthenticated(): boolean {
    return this.tokenService.isLogged();
  }

  isAdmin(): boolean {
    return this.tokenService.isAdmin();
  }

  logout() {
    this.tokenService.logout();
  }

}

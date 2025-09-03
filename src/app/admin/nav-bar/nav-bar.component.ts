import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Envi } from '../../_interface/envi';
import { TokenService } from '../../_service/token.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule, 
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isAdmin: boolean = false;
  environment = Envi;
  message: string = '';
  canManageUsers: boolean = false;
  
  @Output() toggleSidebar = new EventEmitter<void>();

  toggleMenu() {
    this.toggleSidebar.emit();
  }

  constructor(
    private tokenService: TokenService,
  ) {}

  ngOnInit(): void {
    this.checkAdmin();
    this.getUserSession();
  }
  
  checkAdmin(): void {
    this.isAdmin = this.tokenService.isAdmin(); 
  }
  
  getUserSession(): void {
    // this.userService.checkSession().subscribe({
    //   next: (response) => {
    //     this.userResponse = response;
    //     this.canManageUsers = this.userResponse.role === Role.ADMIN;
    //   },
    //   error: (err) => {
    //     this.message = 'Une erreur est survenue lors de la vérification de la session.';
    //     setTimeout(() => this.message = '', 3000); 
    //   }
    // });
  }

}

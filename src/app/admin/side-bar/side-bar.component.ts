import { Component, EventEmitter, Output } from '@angular/core';
import { TokenService } from '../../_service/token.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

  @Output() closeSidebar = new EventEmitter<void>();

  isAdmin: boolean = false;
  message: string = '';
  canManageUsers: boolean = false;
 

  toggleDropdown(event: Event) {
    const target = (event.currentTarget as HTMLElement).parentElement;
    target?.classList.toggle('open');
  }

  onItemClick() {
    this.closeSidebar.emit();
  }

  constructor(
    private tokenService: TokenService
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
    //     this.canManageUsers = this.userResponse.role === Role.ADMIN || this.userResponse.role === Role.SUPER_ADMIN;
    //     this.canBar = this.userResponse.role === Role.AGENT_BAR ||  this.userResponse.role === Role.ADMIN || this.userResponse.role === Role.SUPER_ADMIN;
    //     this.canRestaurant = this.userResponse.role === Role.AGENT_RESTAURANT || this.userResponse.role === Role.ADMIN || this.userResponse.role === Role.SUPER_ADMIN;
    //     this.canAccueil = this.userResponse.role === Role.AGENT_ACCUEIL || this.userResponse.role === Role.ADMIN || this.userResponse.role === Role.SUPER_ADMIN;
    //   },
    //   error: (err) => {
    //     this.message = 'Une erreur est survenue lors de la vérification de la session.';
    //     setTimeout(() => this.message = '', 3000); 
    //   }
    // });
  }

  onLogout() {
    this.tokenService.logout();
  }

}

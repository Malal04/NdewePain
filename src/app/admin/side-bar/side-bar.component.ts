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
  
  }

  checkAdmin(): void {
    this.isAdmin = this.tokenService.isAdmin(); 
  } 

  onLogout() {
    this.tokenService.logout();
  }

}

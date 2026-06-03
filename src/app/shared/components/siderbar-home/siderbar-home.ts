import { Component, inject, signal, ViewChild } from '@angular/core';
import { PostModalComponent } from '../post-model/post-modal';
import { Router, RouterLink } from "@angular/router";
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-siderbar-home',
  imports: [PostModalComponent, RouterLink],
  templateUrl: './siderbar-home.html',
  styleUrl: './siderbar-home.css',
})
export class SiderbarHome {
  @ViewChild(PostModalComponent) postModal!: PostModalComponent;

  private userService = inject(UserService);
  private router = inject(Router);

  sidebarOpen = signal(true);
  activeMenu = signal('inicio');

  setActiveMenu(item: string) {
    this.activeMenu.set(item.toLowerCase());
  }

  newPost() {
    this.postModal?.openModal();
  }

  navigateProfileMe() {
    this.userService.getUserMe().subscribe({
      next: (response) => {
        this.router.navigate(['/home/profile', response.id]);
      }
    });
  }
}

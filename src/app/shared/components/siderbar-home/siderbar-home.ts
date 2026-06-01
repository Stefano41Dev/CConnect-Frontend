import { Component, signal, ViewChild } from '@angular/core';
import { PostModalComponent } from '../post-model/post-modal';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-siderbar-home',
  imports: [PostModalComponent, RouterLink],
  templateUrl: './siderbar-home.html',
  styleUrl: './siderbar-home.css',
})
export class SiderbarHome {
  @ViewChild(PostModalComponent) postModal!: PostModalComponent;
  
  sidebarOpen = signal(true);
  sidebarItems = [
    { icon: 'home', label: 'Inicio', router: '/home' },
    { icon: 'user', label: 'Perfil', router: '/home/profile' },
  ];

  activeMenu = signal('inicio');

  setActiveMenu(item: string) {
    this.activeMenu.set(item.toLowerCase());
  }

  newPost() {
    this.postModal?.openModal();
  }
}

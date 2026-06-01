import { Component, signal, ViewChild } from '@angular/core';
import { PostModalComponent } from '../post-model/post-modal';

@Component({
  selector: 'app-siderbar-home',
  imports: [PostModalComponent],
  templateUrl: './siderbar-home.html',
  styleUrl: './siderbar-home.css',
})
export class SiderbarHome {
  @ViewChild(PostModalComponent) postModal!: PostModalComponent;
  
  sidebarOpen = signal(true);
  sidebarItems = [
    { icon: 'home', label: 'Inicio' },
    { icon: 'user', label: 'Perfil' },
  ];

  activeMenu = signal('inicio');

  setActiveMenu(item: string) {
    this.activeMenu.set(item.toLowerCase());
  }

  newPost() {
    this.postModal?.openModal();
  }
}

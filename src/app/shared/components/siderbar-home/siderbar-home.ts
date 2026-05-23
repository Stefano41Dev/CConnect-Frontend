import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-siderbar-home',
  imports: [],
  templateUrl: './siderbar-home.html',
  styleUrl: './siderbar-home.css',
})
export class SiderbarHome {
  sidebarOpen = signal(true);
  sidebarItems = [
    { icon: 'home', label: 'Inicio' },
    { icon: 'compass', label: 'Explorar' },
    { icon: 'bell', label: 'Notificaciones' },
    { icon: 'mail', label: 'Mensajes' },
    { icon: 'bookmark', label: 'Guardados' },
    { icon: 'user', label: 'Perfil' },
    { icon: 'settings', label: 'Ajustes' },
  ];

  activeMenu = signal('inicio');

  setActiveMenu(item: string) {
    this.activeMenu.set(item.toLowerCase());
  }
}

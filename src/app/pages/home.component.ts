import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Post {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  images?: string[];
  likes: number;
  comments: number;
  shares: number;
  liked?: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.template.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  sidebarOpen = signal(true);
  posts = signal<Post[]>([
    {
      id: '1',
      author: {
        name: 'Sarah Dev',
        handle: '@sarahdev',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop',
      },
      content: 'Just shipped the new CConnect dashboard. Spent the last 3 weeks optimizing performance and the results are incredible. Load times dropped 40%! 🚀',
      timestamp: '2h ago',
      images: ['https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=760&h=400&fit=crop'],
      likes: 342,
      comments: 28,
      shares: 15,
      liked: false,
    },
    {
      id: '2',
      author: {
        name: 'Alex Code',
        handle: '@alexcode',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop',
      },
      content: 'Hot take: Good CSS is just as important as good JavaScript. Your UI is your first impression.',
      timestamp: '4h ago',
      images: [],
      likes: 1205,
      comments: 142,
      shares: 89,
      liked: false,
    },
    {
      id: '3',
      author: {
        name: 'Design Collective',
        handle: '@designcollect',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop',
      },
      content: 'New case study: Building a design system that scales. From 50 to 500+ components.',
      timestamp: '6h ago',
      images: [
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=380&h=300&fit=crop',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=380&h=300&fit=crop',
      ],
      likes: 678,
      comments: 56,
      shares: 32,
      liked: false,
    },
  ]);

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

  toggleLike(postId: string) {
    const post = this.posts().find((p) => p.id === postId);
    if (post) {
      post.liked = !post.liked;
      post.likes += post.liked ? 1 : -1;
    }
  }
}

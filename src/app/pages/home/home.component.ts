import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from "../../shared/components/navbar/navbar";
import { SiderbarHome } from "../../shared/components/siderbar-home/siderbar-home";
import { PostCard } from '../../shared/components/post-card/post-card';
import { PublicacionDtoResponse } from '../../core/models/post/PublicacionDtoResponse';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar, SiderbarHome, PostCard],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  
  posts = signal<PublicacionDtoResponse[]>([
    {
      id: '1',
      usernameAutor: 'Stefano',
      contenido: 'Just shipped the new CConnect dashboard. Spent the last 3 weeks optimizing performance and the results are incredible. Load times dropped 40%! 🚀',
      fechaPublicacion: '2h ago',
      imagenesUrl: ['https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=760&h=400&fit=crop'],
      totalComentarios: 28
      
    },
    {
      id: '2',
      usernameAutor: 'Alex Code',
      contenido: 'Hot take: Good CSS is just as important as good JavaScript. Your UI is your first impression.',
      fechaPublicacion: '4h ago',
      imagenesUrl: [],
      totalComentarios: 142
    },
    {
      id: '3',
      usernameAutor: 'Design Collective',
      contenido: 'New case study: Building a design system that scales. From 50 to 500+ components.',
      fechaPublicacion: '6h ago',
      imagenesUrl: [
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=380&h=300&fit=crop',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=380&h=300&fit=crop',
      ],
      totalComentarios: 56
    },
  ]);

  
}

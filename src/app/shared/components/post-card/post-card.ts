import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './post-card.html',
  styleUrl: './post-card.css',
})
export class PostCard {
  private router = inject(Router);

  @Input({required:true})
  post!:{
    id: string,
    userid:string,
    usernameAutor:string,
    fechaPublicacion: string,
    contenido: string,
    imagenesUrl: string[],
    totalComentarios: number
  }
  
}

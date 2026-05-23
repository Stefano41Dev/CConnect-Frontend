import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-card',
  imports: [CommonModule],
  templateUrl: './post-card.html',
  styleUrl: './post-card.css',
})
export class PostCard {
  @Input({required:true})
  post!:{
    usernameAutor:string,
    fechaPublicacion: string,
    contenido: string,
    imagenesUrl: string[],
    totalComentarios: number
  }
}

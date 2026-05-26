import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from "../../shared/components/navbar/navbar";
import { SiderbarHome } from "../../shared/components/siderbar-home/siderbar-home";
import { PostCard } from '../../shared/components/post-card/post-card';
import { PublicacionDtoResponse } from '../../core/models/post/PublicacionDtoResponse';
import { PostService } from '../../core/services/post.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar, SiderbarHome, PostCard],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private postService: PostService){}

  posts = signal<PublicacionDtoResponse[]>([]);

  currentPage = 0;  
  totalPages = 0;

  ngOnInit(){
    this.loadPosts();
  }

  loadPosts(){
    this.postService.listPosts()
        .subscribe({
            next: (response) => {

                this.posts.set(response.content);
                this.totalPages = response.totalPages;
            }
        });
  }
  
}

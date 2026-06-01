import { Component, signal } from '@angular/core';
import { PostService } from '../../core/services/post.service';
import { PublicacionDtoResponse } from '../../core/models/post/PublicacionDtoResponse';
import { PostCard } from '../../shared/components/post-card/post-card';

@Component({
  selector: 'app-feed',
  imports: [PostCard],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {
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

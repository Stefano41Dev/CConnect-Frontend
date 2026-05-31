import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../core/services/post.service';
import { CommentService } from '../../core/services/comment.service';
import { PublicacionDtoResponse } from '../../core/models/post/PublicacionDtoResponse';
import { ComentarioDtoResponse } from '../../core/models/comment/ComentarioDtoResponse';
import { forkJoin } from 'rxjs';
import { PageResponse } from '../../core/models/pagination/PageResponse';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  private activeRoute = inject(ActivatedRoute);
  private postService = inject(PostService);
  
  post = signal<PublicacionDtoResponse | null>(null);
  comments = signal<PageResponse<ComentarioDtoResponse> | null>(null);
  loading = signal(true);

  ngOnInit(){
    const id = this.activeRoute.snapshot.paramMap.get('id');
    if (id) {
      
      forkJoin({
        post: this.postService.getPostById(id),
        comments: this.postService.getCommentsPostById(id)
      }).subscribe({
        next: ({ post, comments }) => {
          this.loading.set(false);
          this.post.set(post);
          this.comments.set(comments);
        },
        error: () => {
          this.loading.set(false);
        }
      });
    }
  }
}

import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostService } from '../../core/services/post.service';
import { PublicacionDtoResponse } from '../../core/models/post/PublicacionDtoResponse';
import { ComentarioDtoResponse } from '../../core/models/comment/ComentarioDtoResponse';
import { forkJoin } from 'rxjs';
import { PageResponse } from '../../core/models/pagination/PageResponse';
import { Loading } from '../../shared/components/loading/loading';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComentarioDtoRequest } from '../../core/models/comment/ComentarioDtoRequest';
import { CommentService } from '../../core/services/comment.service';

@Component({
  selector: 'app-post',
  imports: [CommonModule, Loading, ReactiveFormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  private activeRoute = inject(ActivatedRoute);
  private postService = inject(PostService);
  private commentService = inject(CommentService);
  
  post = signal<PublicacionDtoResponse | null>(null);
  comments = signal<PageResponse<ComentarioDtoResponse> | null>(null);
  loading = signal(true);
  currentCommentPage = signal(0);
  postId: string | null = null;

  protected readonly formComment = new FormGroup({
    contenido: new FormControl('',{
      nonNullable: true,
      validators: [Validators.required]
    })
  })

  ngOnInit(){
    this.postId = this.activeRoute.snapshot.paramMap.get('id');
    if (this.postId) {
      this.loadPostAndComments();
    }
  }

  loadPostAndComments(){
    if (!this.postId) return;
    
    this.loading.set(true);
    forkJoin({
      post: this.postService.getPostById(this.postId),
      comments: this.postService.getCommentsPostById(this.postId, this.currentCommentPage())
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

  goToNextPage(){
    if (this.comments() && !this.comments()?.last) {
      this.currentCommentPage.update(page => page + 1);
      this.loadComments();
    }
  }

  goToPreviousPage(){
    if (this.currentCommentPage() > 0) {
      this.currentCommentPage.update(page => page - 1);
      this.loadComments();
    }
  }

  loadComments(){
    if (!this.postId) return;
    
    this.loading.set(true);
    this.postService.getCommentsPostById(this.postId, this.currentCommentPage())
      .subscribe({
        next: (comments) => {
          this.loading.set(false);
          this.comments.set(comments);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        error: () => {
          this.loading.set(false);
        }
      });
  }

  newComment(idPublicacion:string){
    const {contenido} = this.formComment.getRawValue();

    if (!contenido.trim()) {
      return;
    }
  
    const comentarioRequest: ComentarioDtoRequest = {
      idPublicacion: idPublicacion,
      contenido: contenido
    }
    this.commentService.newComment(comentarioRequest).subscribe({
      next: () => {
        this.formComment.reset();
        this.loadComments();
      }
    });
    
  }
}

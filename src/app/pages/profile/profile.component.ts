import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { UsuarioDtoResponse } from '../../core/models/user/UsuarioDtoResponse';
import { UsuarioPerfilDtoResponse } from '../../core/models/user/UsuarioPerfilDtoResponse';
import { PageResponse } from '../../core/models/pagination/PageResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../core/services/post.service';
import { PublicacionDtoResponse } from '../../core/models/post/PublicacionDtoResponse';
import { PostCard } from '../../shared/components/post-card/post-card';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, PostCard],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  
  private readonly userService = inject(UserService);
  private readonly postService = inject(PostService);
  private activeRoute = inject(ActivatedRoute);
  private router = inject(Router);

  user = signal<UsuarioDtoResponse | null>(null);
  posts = signal<PageResponse<PublicacionDtoResponse> | null>(null);

  friends = signal<UsuarioPerfilDtoResponse[]>([]);
  currentPage = signal<number>(0);
  totalPages = signal<number>(0);
  pageSize = signal<number>(9);

  postsCurrentPage = signal<number>(0);
  postsTotalPages = signal<number>(0);
  postsPageSize = signal<number>(10);

  loadingFriends = signal<boolean>(true);
  loadingPosts = signal<boolean>(true);
  userId: string | null = null;

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.userId = params.get('id');
      if (!this.userId) return;

      this.userService.getUserById(this.userId).subscribe({
        next: (userData) => {
          this.user.set(userData);
          this.loadFriends();
          this.loadPostsUserId();
        },
        error: () => {
          this.loadingFriends.set(false);
          this.loadingPosts.set(false);
        }
      });
    });
  }

  private loadPostsUserId(page: number = 0): void {
    const userId = this.user()?.id;
    if (!userId) return;

    this.loadingPosts.set(true);
    this.postService.listPostsById(userId, page, this.postsPageSize()).subscribe({
      next: (userPosts) => {
        this.posts.set(userPosts);
        this.postsTotalPages.set(userPosts.totalPages);
        this.postsCurrentPage.set(userPosts.number);
        this.loadingPosts.set(false);
      },
      error: () => {
        this.loadingPosts.set(false);
      }
    });
  }

  private loadFriends(page: number = 0): void {
    const userId = this.user()?.id;
    if (!userId) return;

    this.loadingFriends.set(true);
    this.userService.getListFreindsByIdUser(userId, page, this.pageSize()).subscribe({
      next: (response: PageResponse<UsuarioPerfilDtoResponse>) => {
        this.friends.set(response.content);
        this.totalPages.set(response.totalPages);
        this.currentPage.set(response.number);
        this.loadingFriends.set(false);
      },
      error: () => {
        this.loadingFriends.set(false);
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages()) {
      this.loadFriends(page);
    }
  }

  goToPostsPage(page: number): void {
    if (page >= 0 && page < this.postsTotalPages()) {
      this.loadPostsUserId(page);
    }
  }

  getDefaultProfileImage(): string {
    return 'default-profile.jpg';
  }

  navigateProfile(id: string) {
    this.router.navigate(['/home/profile', id]);
  }
}

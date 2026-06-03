import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { UsuarioDtoResponse } from '../../core/models/user/UsuarioDtoResponse';
import { UsuarioPerfilDtoResponse } from '../../core/models/user/UsuarioPerfilDtoResponse';
import { PageResponse } from '../../core/models/pagination/PageResponse';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  
  private readonly userService = inject(UserService);
  private activeRoute = inject(ActivatedRoute);
  private router = inject(Router);

  user = signal<UsuarioDtoResponse | null>(null);
  friends = signal<UsuarioPerfilDtoResponse[]>([]);
  currentPage = signal<number>(0);
  totalPages = signal<number>(0);
  pageSize = signal<number>(9);
  loading = signal<boolean>(true);
  userId: string | null = null;
  ngOnInit(): void {
      
    this.activeRoute.paramMap.subscribe(params => {
      this.userId = params.get('id');
      if(!this.userId) return;
    
      this.userService.getUserById(this.userId).subscribe({
        next: (userData) => {
          this.user.set(userData);
          this.loadFriends();
        },
        error: () => {
          this.loading.set(false);
        }
      });
    });
    
    
  }


  private loadFriends(page: number = 0): void {
    const userId = this.user()?.id;
    if (!userId) return;

    this.loading.set(true);
    this.userService.getListFreindsByIdUser(userId, page, this.pageSize()).subscribe({
      next: (response: PageResponse<UsuarioPerfilDtoResponse>) => {
        this.friends.set(response.content);
        this.totalPages.set(response.totalPages);
        this.currentPage.set(response.number);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages()) {
      this.loadFriends(page);
    }
  }

  getDefaultProfileImage(): string {
    return 'default-profile.jpg';
  }

  navigateProfile(id: string) {
    this.router.navigate(['/home/profile', id]);
  }
}

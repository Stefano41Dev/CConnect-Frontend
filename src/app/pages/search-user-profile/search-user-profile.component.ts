import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { UsuarioPerfilDtoResponse } from '../../core/models/user/UsuarioPerfilDtoResponse';
import { PageResponse } from '../../core/models/pagination/PageResponse';
import { ActivatedRoute } from '@angular/router';
import { CardProfileUserComponent } from "../../shared/components/card-profile-user/card-profile-user.component";

@Component({
  selector: 'app-search-user-profile',
  imports: [CardProfileUserComponent],
  templateUrl: './search-user-profile.component.html',
  styleUrl: './search-user-profile.component.css',
})
export class SearchUserProfileComponent {
  private userService = inject(UserService);
  private activeRoute = inject(ActivatedRoute);
  users = signal<PageResponse<UsuarioPerfilDtoResponse> | null>(null);
  username : string | null = null;
  
  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      const username = params.get('username');

      if (!username) return;

      this.userService.getListUserByUsername(username).subscribe({
        next: (response) => {
          this.users.set(response);
        }
      });
    });
  }
}

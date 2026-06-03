import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-profile-user',
  imports: [],
  templateUrl: './card-profile-user.component.html',
  styleUrl: './card-profile-user.component.css',
})
export class CardProfileUserComponent {
  private router = inject(Router);
  @Input({required:true})
  user!:{
    id: string,
    username: string
  }
  navigateProfile(id: string){ 
    this.router.navigate(['/home/profile', id]);
  }
}

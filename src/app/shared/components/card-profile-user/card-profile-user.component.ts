import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-profile-user',
  imports: [],
  templateUrl: './card-profile-user.component.html',
  styleUrl: './card-profile-user.component.css',
})
export class CardProfileUserComponent {
  @Input({required:true})
  user!:{
    id: string,
    username: string
  }
}

import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { PostComponent } from './pages/post/post.component';
import { FeedComponent } from './pages/feed/feed.component';
import { ProfileComponent } from './pages/profile/profile.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, children:[
      {
        path: '',
        component: FeedComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'post/:id',
        component: PostComponent
      }
  ], canActivate:[authGuard] },
  { path: 'post/:id', component: PostComponent, canActivate:[authGuard] },
];

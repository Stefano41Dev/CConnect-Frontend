import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from "../../shared/components/navbar/navbar";
import { SiderbarHome } from "../../shared/components/siderbar-home/siderbar-home";
import { FeedComponent } from "../feed/feed.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar, SiderbarHome],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
}

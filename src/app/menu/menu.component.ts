import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { getAuth, User } from 'firebase/auth';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary" style="border-bottom: 1px solid #6ca3f9;">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img src="assets/Avnit-Logo_1.png" alt="Avnit Logo" style="width: 80px ; height: 30px;">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto">
            <li class="nav-item" routerLinkActive="active">
              <a class="nav-link" routerLink="/">Home</a>
            </li>
            <li class="nav-item" *ngIf="loggedIn" routerLinkActive="active">
              <a class="nav-link" routerLink="/myblogs">My Blogs</a>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto">
            <li class="nav-item" *ngIf="!loggedIn" routerLinkActive="active">
              <button class="btn btn-outline-light glossy-border" routerLink="/login">Login</button>
            </li>
            <li class="nav-item" *ngIf="loggedIn">
              <a class="nav-link" [routerLink]="'/profile/' + user?.uid">My Profile</a>
            </li>
            <li class="nav-item" *ngIf="loggedIn">
              <a class="nav-link" routerLink="/" (click)="logout()">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .btn-outline-light {
      margin-left: 10px;
      border-radius: 50px;
    }
  `]
})
export class MenuComponent implements OnInit {
  loggedIn: boolean = false;
  user: User | null = null;

  ngOnInit(): void {
    const auth = getAuth();
    this.user = auth.currentUser;
    this.loggedIn = !!this.user;

    auth.onAuthStateChanged((user) => {
      this.user = user;
      this.loggedIn = !!user;
    });
  }

  logout() {
    getAuth().signOut();
  }
}
 
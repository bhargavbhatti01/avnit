import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a routerLink="/">Home</a>
        <a routerLink="/login">Login</a>
      </div>
    </nav>
  `
})
export class MenuComponent {}
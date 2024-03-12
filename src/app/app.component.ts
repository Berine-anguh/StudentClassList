import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MAIN_MENU } from './utils/constants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client-angular';
  menu = MAIN_MENU;

  constructor(
    private router: Router
  ) {

  }

  handleNav(path: string) {
    this.router.navigate([path])
  }
}
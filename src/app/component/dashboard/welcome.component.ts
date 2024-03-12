import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';
import { TileComponent } from './tile.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TileComponent],
  template: `
    <div>
        <h3>Welcome</h3>

        <div class="tiles" >
            <app-welcome-tile
             [title]="'Students'"
             [count]="'10'"
             (onAction)="handleNav('/students')"
             ></app-welcome-tile>
            <app-welcome-tile
             [title]="'Programs'"
             [count]="'05'"
             (onAction)="handleNav('/programs')"></app-welcome-tile>
        </div>
    </div>
  `,
  styles: [`
    .tiles {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        
    }
    .tiles app-welcome-tile {
        flex-grow: 1;
        max-width: 500px;
        padding:15px;
        
       
    }
  `]
})
export class WelcomeComponent {
  title = 'client-angular';

  constructor(
    private router: Router
  ) {

  }

  handleNav(path: string) {
    this.router.navigate([path])
  }
}
import { AfterViewInit, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersService } from './core/services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: ` 
  
  <router-outlet/> `,
})
export class AppComponent {



}


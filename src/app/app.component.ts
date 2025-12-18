import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotifyService } from './core/services/notify.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div
      [class.alert-error]="!notifyService.isSuccess()"
      [class.alert-success]=" notifyService.isSuccess() "
      [class.scale-0]="!notifyService.visible()"
      [class.scale-100]="notifyService.visible()"
      role="alert"
      class="transition delay-150 duration-300 ease-in-out absolute right-0 m-2 alert alert-error"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="h-6 w-6 shrink-0 stroke-current"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>{{ notifyService.message() }}</span>
    </div>
    <router-outlet />
  `,
})
export class AppComponent {
  notifyService = inject(NotifyService);
}

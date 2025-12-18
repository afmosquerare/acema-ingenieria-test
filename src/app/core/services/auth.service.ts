import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { UsersService } from './users.service';
import { NotifyService } from './notify.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly usersService = inject(UsersService);
  private readonly notifyService = inject(NotifyService);
  private readonly router = inject(Router);
  private userService = inject(UsersService);
  public user: WritableSignal<string>;
  constructor() {
    this.user = signal(localStorage.getItem('session_id') ?? '');
  }

  public login(email: string, password: string) {
    this.usersService.getUsers().subscribe((response) => {
      if (!response) return;
      const user = response.results.filter((user) => user.email === email);
      if (user.length === 0 || !(user[0].login.password === password)) {
        this.notifyService.error('Correo electronico o contraseña invalido.');
        return;
      }
      localStorage.setItem('session_id', user[0].login.uuid);
      this.router.navigateByUrl('/dashboard/users');
      window.location.reload();
    });
  }

  public logout() {
    localStorage.removeItem('session_id');
    window.location.reload();
  }

  public isAuthenticated(identifier: string): Observable<boolean> {
    this.userService.getUsers().subscribe((users) => {
      const exists = users.results.filter((u) => u.login.uuid === identifier );
      console.log(exists);
      if (exists.length === 0) return;
      return of(true)
    });
    return of( false );
  }
}

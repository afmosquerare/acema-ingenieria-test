import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../../../core/services/users.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FormService } from '../../../../core/services/form.service';
import { NotifyService } from '../../../../core/services/notify.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  template: ` <div class="hero bg-base-200 min-h-screen">
    <div class=" m-auto flex hero-content flex-col">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Iniciar sesión</h1>
        <p class="py-6">Ingresar email y contraseña para acceder al sistema.</p>
      </div>
      <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div class="card-body">
          <form [formGroup]="form">
            <fieldset class="fieldset">
              <label class="label">Correo electronico</label>
              <input
                [class.input-error]="this.form.controls.email.touched"
                formControlName="email"
                type="email"
                class="input"
                placeholder="Correo eletronico"
              />
              <label class="label">Contraseña</label>
              <input
                [class.input-error]="this.form.controls.password.touched"
                formControlName="password"
                type="password"
                class="input"
                placeholder="Contraseña"
              />
              <p class="test-danger hidden">
                Must be more than 8 characters, including
                <br />At least one number <br />At least one lowercase letter
                <br />At least one uppercase letter
              </p>
              <button (click)="submit()" class="btn btn-primary mt-4">
                Login
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>`,
  imports: [ReactiveFormsModule],
})
export default class LoginPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly formService = inject(FormService);
  private notifyService = inject(NotifyService);
  private authService = inject(AuthService);
  public form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  private readonly userService = inject(UsersService);
  public ngOnInit(): void {
    this.userService.getUsers().subscribe(console.log);
  }

  public submit() {
    this.formService.markAllControlsAsDirtyAndTouched(this.form);
    const user = this.form.value;
    this.authService.login(user.email!, user.password!);
  }
}

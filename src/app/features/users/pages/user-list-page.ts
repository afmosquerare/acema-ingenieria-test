import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../core/services/users.service';
import type { User } from '../../../core/interfaces/user';
import { PaginationComponent } from "../components/pagination.component";

@Component({
  imports: [CommonModule, PaginationComponent],
  template: `
  <div class="overflow-x-auto">
    <table class="table w-full">
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Ubicación</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let user of users">
          <td>
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="mask mask-squircle h-12 w-12">
                  <img [src]="user.picture.thumbnail" [alt]="user.name.first + ' ' + user.name.last" />
                </div>
              </div>
            </div>
          </td>
          <td>
            <div class="font-bold">{{ user.name.first }} {{ user.name.last }}</div>
            <div class="text-sm opacity-50">{{ user.login.username }}</div>
          </td>
          <td class="truncate max-w-xs">{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.location.city }}, {{ user.location.country }}</td>
          <td>
            <button class="btn btn-error btn-xs mr-2">Eliminar</button>
            <button class="btn btn-info btn-xs">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination [pages]="10" />
  </div>
  `,
})
export default class UserListPage implements OnInit {
  private readonly usersService = inject(UsersService);
  users: User[] = [];

  constructor() {}

  ngOnInit() {
    this.usersService.getUsersForTable(10).subscribe((res) => {
      this.users = res.results || [];
    });
  }
}

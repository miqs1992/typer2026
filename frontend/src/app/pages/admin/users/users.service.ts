import { computed, Injectable, signal } from '@angular/core';
import { CreateUserData, UpdateUserData, User } from './users.model';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends DataService<User, CreateUserData, UpdateUserData> {
  path = signal('admin/users');

  readonly users = computed(() => this.state().data);
}

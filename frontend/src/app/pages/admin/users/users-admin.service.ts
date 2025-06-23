import { computed, Injectable, signal } from '@angular/core';
import { CreateUserData, UpdateUserData, User } from './users.model';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class UsersAdminService extends DataService<User, CreateUserData, UpdateUserData> {
  path = signal('admin/users');
  resourceName = 'user';

  readonly users = computed(() => this.state().data);
}

import { computed, Injectable, signal } from '@angular/core';
import { UpdateUserData, User } from './users.model';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class UsersAdminService extends DataService<User, {}, UpdateUserData> {
  path = signal('admin/users');
  resourceName = 'user';

  readonly users = computed(() => this.state().data);
}

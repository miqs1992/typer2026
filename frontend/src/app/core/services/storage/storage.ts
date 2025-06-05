import { Injectable } from '@angular/core';
import { StorageKey } from './storage.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  public save(key: StorageKey, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  public read(key: StorageKey): any {
    const value = this.storage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  public remove(key: StorageKey) {
    return this.storage.removeItem(key);
  }

  public clear() {
    this.storage.clear();
  }
}

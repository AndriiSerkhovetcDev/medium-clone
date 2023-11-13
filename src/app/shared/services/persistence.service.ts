import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  constructor() {}

  public set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.log('Error saving to LocalStorage', e);
    }
  }

  public get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key) as string);
    } catch (e) {
      console.error('Error getting data from LocalStorage', e);
      return null;
    }
  }
}

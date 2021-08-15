import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PersistenceService {

    set(key: string, data: any): void {
        localStorage.setItem(key, JSON.stringify(data));
    }

    get(key: string): string | null {
        return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : null;
    }

    remove(key: string): void {
        localStorage.removeItem(key);
    }

    clear(): void {
        localStorage.clear();
    }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlteracaoDisplayService {

  private menuVisibleSubject = new BehaviorSubject<boolean>(false);
  menuVisible$ = this.menuVisibleSubject.asObservable();

  toggleMenu() {
    this.menuVisibleSubject.next(!this.menuVisibleSubject.value);
  }

  closeMenu() {
    this.menuVisibleSubject.next(false);
  }

  // Método para abrir o menu
  openMenu() {
    this.menuVisibleSubject.next(true);
  }

  // Método para obter o valor atual do menu
  getMenuVisible(): boolean {
    return this.menuVisibleSubject.value; // Acessa o valor atual do BehaviorSubject
  }

}

import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlteracaoDisplayService {
  private menuVisibleSubject = new BehaviorSubject<boolean>(false);
  menuVisible$ = this.menuVisibleSubject.asObservable();

  // Método para verificar se a tela está abaixo de 767px
  private isMobile(): boolean {
    return window.innerWidth <= 767;
  }

  toggleMenu() {
    if (this.isMobile()) {
      this.menuVisibleSubject.next(!this.menuVisibleSubject.value);
    }
  }

  closeMenu() {
    if (this.isMobile()) {
      this.menuVisibleSubject.next(false);
    }
  }

  openMenu() {
    if (this.isMobile()) {
      this.menuVisibleSubject.next(true);
    }
  }
}

import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlteracaoDisplayService {
  private menuVisibleSubject = new BehaviorSubject<boolean>(false);
  menuVisible$ = this.menuVisibleSubject.asObservable();

  // Método para verificar se a tela está abaixo de 767px
  private isDevices(): boolean {
    return window.innerWidth <= 1017;
  }

  toggleMenu() {
    const atual = this.menuVisibleSubject.value;
    this.menuVisibleSubject.next(!atual);
    console.log('[Service] toggleMenu:', !atual);
  }

  closeMenu() {
    const atual = this.menuVisibleSubject.value;
    this.menuVisibleSubject.next(false);
    console.log('[Service] closeMenu', !atual);
  }

  openMenu() {

      this.menuVisibleSubject.next(true);

  }
}

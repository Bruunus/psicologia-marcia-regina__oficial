import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlteracaoDisplayService {

  private menuVisibleSubject = new BehaviorSubject<boolean>(false);
  menuVisible$ = this.menuVisibleSubject.asObservable();

  private isSmallScreenSubject = new BehaviorSubject<boolean>(window.innerWidth <= 767);
  isSmallScreen$ = this.isSmallScreenSubject.asObservable();

  constructor() {
    window.addEventListener('resize', this.updateScreenSize.bind(this));
  }

  private updateScreenSize() {
    const isSmall = window.innerWidth <= 767;
    this.isSmallScreenSubject.next(isSmall);
  }

  toggleMenu() {
    this.menuVisibleSubject.next(!this.menuVisibleSubject.value);
  }

  closeMenu() {
    this.menuVisibleSubject.next(false);
  }

  openMenu() {
    this.menuVisibleSubject.next(true);
  }
}

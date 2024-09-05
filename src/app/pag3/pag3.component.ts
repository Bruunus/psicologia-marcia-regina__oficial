import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pag3',
  templateUrl: './pag3.component.html',
  styleUrls: ['./pag3.component.scss']
})
export class Pag3Component implements OnInit {

  nomeLogin: string | null = ''

  constructor() { }

  ngOnInit(): void {
    this.nomeLogin = localStorage.getItem('usuario')
  }

}

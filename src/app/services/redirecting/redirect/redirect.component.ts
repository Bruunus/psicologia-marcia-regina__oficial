import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {



  constructor(private router: Router) {

  }

  ngOnInit(): void {
    // também é executado um settimeout com a outra classe que o chama
    setTimeout(() => {
      this.router.navigate(['pacientes']);
    }, 500);
  }










}

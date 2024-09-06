import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ending-session',
  templateUrl: './ending-session.component.html',
  styleUrls: ['./ending-session.component.scss']
})
export class EndingSessionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 500);
  }

}

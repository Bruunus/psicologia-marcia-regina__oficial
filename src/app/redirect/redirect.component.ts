import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  PATH: string;

  constructor(private router: Router) {
    this.PATH = '';
  }

  ngOnInit(): void {

  }


  redirectPath(path: string): void {

    window.location.reload();

    switch (path) {
      case 'LoginComponent':
        // this.router.navigate(['/laudos/page2']);


          this.router.navigate(['laudos/page2']).then(() => {
            setTimeout(() => {
              window.location.reload();
            }, 500);
          });

        break;

      default:
        break;
    }

  }


}

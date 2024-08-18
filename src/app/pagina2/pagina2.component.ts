import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.component.html',
  styleUrls: ['./pagina2.component.scss']
})
export class Pagina2Component implements OnInit {

  frutas: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.getFrutas();

  }

  getFrutas() {
    this.http.get<any[]>('http://localhost:8080/api/list').subscribe(
      response => {
        this.frutas = response;
      },
      error => {

        console.error(error);
      }
    );
  }

}

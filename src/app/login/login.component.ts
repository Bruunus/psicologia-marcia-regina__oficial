import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pagina1',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss',
    './style-middle-responsive.scss',
    '../../styles.scss'
  ]
})
export class LoginComponent implements OnInit {

  formValidation!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }


  processAuthentication(): void {

  }

}

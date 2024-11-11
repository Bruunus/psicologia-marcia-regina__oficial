import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div>
      <img src="../../../../assets/img/loading-eclipse.gif" alt="logo" id="img-loading-cadastro" class="img-fluid no-select-img">
    </div>
  `,
  styles: [`

    #img-loading-cadastro {
      height: 47px;
    }

  `]
})
export class LoadingComponent {

}

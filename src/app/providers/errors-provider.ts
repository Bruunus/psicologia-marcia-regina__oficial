import { NgModule } from "@angular/core";
import { ErrorService } from "../services/messagers/error-message/error.service";
import { ErrorComponent } from "../services/messagers/error-message/error.component";


@NgModule({
  providers: [
    ErrorService, ErrorComponent
  ]
})
export class ErrorsProvider {}

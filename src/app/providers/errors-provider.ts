import { NgModule } from "@angular/core";
import { ErrorService } from "../services/error/error.service";
import { ErrorComponent } from "../services/error/error.component";


@NgModule({
  providers: [
    ErrorService, ErrorComponent
  ]
})
export class ErrorsProvider {}

import { NgModule } from "@angular/core";
import { MessageService } from "../services/messagers/message/message.service";
import { MessageComponent } from "../services/messagers/message/message.component";


@NgModule({
  providers: [
    MessageService, MessageComponent
  ]
})
export class ErrorsProvider {}

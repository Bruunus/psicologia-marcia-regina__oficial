import { Pagina2Component } from './pagina2/pagina2.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RedirectComponent } from './redirect/redirect.component';
import { Providers } from './Providers';
import { Pag3Component } from './pag3/pag3.component';



@NgModule({
  declarations: [
    AppComponent,
    Pagina2Component,
    LoginComponent,
    RedirectComponent,
    Pag3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [Providers],
  bootstrap: [AppComponent]
})
export class AppModule { }

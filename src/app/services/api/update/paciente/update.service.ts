import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { UrlService } from 'src/app/services/url-service/url.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  private unsubscribe$ = new Subject<void>();

  constructor(
    private http: HttpClient, private userMessage: MessageService, private urlService: UrlService
  ) { }


  updatePatient(): Promise<boolean> {

  }


}

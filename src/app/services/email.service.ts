import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { config } from '../../app/config';

@Injectable()
export class EmailService {


  servidor: any;

  constructor(private http: Http) {
  }

  sendEmail(params: any) {

    return this.http.post(config.url + 'sendemail', params ).map(
      response => {
        return response;
      }
    );
  }

  private getHeaders() {
    return new Headers(  { 'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'});
  }
}

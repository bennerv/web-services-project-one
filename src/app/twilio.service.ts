import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Details } from './details/details';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwilioService {

  private twilioSid: string = "AC4e51997237b51b3aa0766048e41130ec";
  private twilioFromNumber: string = "+17152038200";
  private twilioAuthorizationHeader = new HttpHeaders({ 'Authorization': "" });

  private twilioBaseApi: string = "https://api.twilio.com/2010-04-01";
  private twilioSendSmsApi: string = this.twilioBaseApi + "/Accounts/" + this.twilioSid + "/Messages.json";

  constructor(private http: HttpClient) {
  }

  /*
   * Purpose: Sends the initial query to the Twilio API to send out a text message
   * Returns: An Observable<any> which is the response of the API call when it occurs
   */
  public sendInitialTextMessage(details: Details, distance: string, duration: string): Observable<any> {
    const httpOptions = {
      headers: this.twilioAuthorizationHeader
    };

    let formData: FormData = new FormData();
    formData.append("From", this.twilioFromNumber);
    formData.append("To", "+1" + details.phone_number);
    formData.append("Body", details.name + " will reach " + details.street + " " + details.city + " " + details.state + " in approximately " + duration + ". Approximate distance: " + distance);

    return this.http.post(this.twilioSendSmsApi, formData, httpOptions);
  }

  /*
   * Purpose: Sends the initial query to the Twilio API to send out a text message
   * Returns: An Observable<any> which is the response of the API call when it occurs
   */
  public sendTextMessage(phoneNumber: string, name: string): Observable<any> {
    const httpOptions = {
      headers: this.twilioAuthorizationHeader
    };

    let formData: FormData = new FormData();
    formData.append("From", this.twilioFromNumber);
    formData.append("To", "+1" + phoneNumber);
    formData.append("Body", name + " has made it to their destination! Thanks for using Text Me When You Get There");

    return this.http.post(this.twilioSendSmsApi, formData, httpOptions);
  }
}

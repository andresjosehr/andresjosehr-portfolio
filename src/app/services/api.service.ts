import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  public sendMail(name: string, email: string, message: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('name', name);
    params = params.append('email', email);
    params = params.append('message', message);
    return this.httpClient.get(this.apiUrl, { params: params });
  }
}

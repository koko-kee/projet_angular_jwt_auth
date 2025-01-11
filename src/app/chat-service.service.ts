import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from './models/auth-response';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  sendMessage(request: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-message`, request);
  }


  fetchMessages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/fetch-messages`);
  }
}

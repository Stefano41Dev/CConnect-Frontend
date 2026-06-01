import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { AuthRequest } from '../models/auth/AuthRequest';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth/AuthResponse';
import { RegisterRequest } from '../models/auth/RegisterRequest';
import { MessageResponse } from '../models/auth/MessageResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`

  private httpClient = inject(HttpClient);

  login(request: AuthRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/login`, request);
  }
  register(request:RegisterRequest): Observable<MessageResponse>{
    return this.httpClient.post<MessageResponse>(`${this.apiUrl}/register`, request);
  }
}

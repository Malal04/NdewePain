import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Token } from '../_interface/token';
import { Envi } from '../_interface/envi';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url =`${Envi.Url}/Auth`;

  constructor(private http: HttpClient) { }

  refreshToken(): Observable<Token> {
    return this.http.post<Token>(`${this.url}/refresh-token`, {});
  }

}

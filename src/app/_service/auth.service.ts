import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Token } from '../_interface/token';
import { Envi } from '../_interface/envi';
import { UserLogin, UserRegister } from '../_interface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url =`${Envi.Url}`;

  constructor(private http: HttpClient) { }

  login(user: UserLogin): Observable<Token> {
    return this.http.post<Token>(`${this.url}/connexion`, user);
  }

  register(user: UserRegister): Observable<Token> {
    return this.http.post<Token>(`${this.url}/inscription`, user);
  }

  refreshToken(): Observable<Token> {
    return this.http.post<Token>(`${this.url}/refresh-token`, {});
  }

}

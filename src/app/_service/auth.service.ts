import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Token } from '../_interface/token';
import { ApiResponse, Envi } from '../_interface/envi';
import { 
  ChangePasswordDto, 
  ForgotPasswordDto, 
  ResetPasswordDto, 
  UpdateProfileDto, 
  User, 
  UserLogin, 
  UserRegister 
} from '../_interface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url =`${Envi.Url}/auth`;

  constructor(private http: HttpClient) { }

  login(user: UserLogin): Observable<Token> {
    return this.http.post<Token>(`${this.url}/login`, user);
  }

  register(user: UserRegister | FormData): Observable<Token> {
    return this.http.post<Token>(`${this.url}/register`, user);
  }

  refreshToken(): Observable<Token> {
    return this.http.post<Token>(`${this.url}/refresh`, {});
  }

  logout(): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.url}/logout`, {});
  }

  me(): Observable<User> {
    return this.http.get<User>(`${this.url}/me`);
  }

  changePassword(payload: ChangePasswordDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.url}/change-password`, payload);
  }

  forgotPassword(payload: ForgotPasswordDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.url}/forgot-password`, payload);
  }

  resetPassword(payload: ResetPasswordDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.url}/reset-password`, payload);
  }

  updateProfile(payload: UpdateProfileDto): Observable<User> {
    return this.http.post<User>(`${this.url}/update-profile`, payload);
  }

  listUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`);
  }

  showUser(id: number | string): Observable<User> {
    return this.http.get<User>(`${this.url}/users/${id}`);
  }

  updateAccountState(id: number | string, state: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.url}/users/${id}/account-state`, state);
  }

}

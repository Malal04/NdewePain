import { Injectable } from '@angular/core';
import { ApiResponse, Envi } from '../_interface/envi';
import { HttpClient } from '@angular/common/http';
import { Ingredient, IngredientDto } from '../_interface/ingredient';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private readonly url = `${Envi.Url}/ingredients`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.url);
  }

  create(dto: IngredientDto): Observable<Ingredient> {
    return this.http.post<Ingredient>(this.url, dto);
  }

  pagination(params?: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.url}/pagination`, { params });
  }

  search(query: string): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.url}/search?query=${query}`);
  }

  getById(id: number): Observable<Ingredient> {
    return this.http.get<Ingredient>(`${this.url}/${id}`);
  }

  update(id: number, dto: IngredientDto): Observable<Ingredient> {
    return this.http.put<Ingredient>(`${this.url}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  toggleStatus(id: number): Observable<ApiResponse> {
    return this.http.patch<ApiResponse>(`${this.url}/${id}/toggle-status`, {});
  }
  
}

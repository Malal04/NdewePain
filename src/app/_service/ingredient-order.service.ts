import { Injectable } from '@angular/core';
import { Envi } from '../_interface/envi';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../_interface/envi';
import { IngredientOrder, IngredientOrderDto } from '../_interface/ingredient-order';

@Injectable({
  providedIn: 'root'
})
export class IngredientOrderService {

  private readonly url = `${Envi.Url}/ingredient-orders`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<IngredientOrder[]> {
    return this.http.get<IngredientOrder[]>(this.url);
  }

  create(dto: IngredientOrderDto): Observable<IngredientOrder> {
    return this.http.post<IngredientOrder>(this.url, dto);
  }

  pagination(params?: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.url}/pagination`, { params });
  }

  search(query: string): Observable<IngredientOrder[]> {
    return this.http.get<IngredientOrder[]>(`${this.url}/search?query=${query}`);
  }

  getById(id: number): Observable<IngredientOrder> {
    return this.http.get<IngredientOrder>(`${this.url}/${id}`);
  }

  update(id: number, dto: IngredientOrderDto): Observable<IngredientOrder> {
    return this.http.put<IngredientOrder>(`${this.url}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  cancel(id: number): Observable<ApiResponse> {
    return this.http.patch<ApiResponse>(`${this.url}/${id}/cancelled`, {});
  }

  deliver(id: number): Observable<ApiResponse> {
    return this.http.patch<ApiResponse>(`${this.url}/${id}/delivered`, {});
  }

}

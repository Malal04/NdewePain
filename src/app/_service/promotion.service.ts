import { Injectable } from '@angular/core';
import { ApiResponse, Envi, PaginatedResponse } from '../_interface/envi';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Promotion, PromotionDto } from '../_interface/promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private readonly url = `${Envi.Url}/promotions`;

  constructor(private http: HttpClient) {}

  getAll(page: number = 1): Observable<PaginatedResponse<Promotion>> {
    return this.http.get<PaginatedResponse<Promotion>>(this.url, {  
      params: { page: page.toString() } 
    });
  }

  create(dto: PromotionDto): Observable<Promotion> {
    return this.http.post<Promotion>(this.url, dto);
  }

  getById(id: number): Observable <ApiResponse <Promotion>> {
    return this.http.get<ApiResponse<Promotion>>(`${this.url}/${id}`);
  }

  toggleStatus(promotionId: number): Observable<ApiResponse> {
    return this.http.patch<ApiResponse>(`${this.url}/toggle-status/${promotionId}`, {});
  }
  
  update(id: number, dto: PromotionDto): Observable<Promotion> {
    return this.http.put<Promotion>(`${this.url}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}

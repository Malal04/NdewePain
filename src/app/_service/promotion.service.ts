import { Injectable } from '@angular/core';
import { Envi } from '../_interface/envi';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Promotion, PromotionDto } from '../_interface/promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private readonly url = `${Envi.Url}/promotions`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(this.url);
  }

  create(dto: PromotionDto): Observable<Promotion> {
    return this.http.post<Promotion>(this.url, dto);
  }

  getById(id: number): Observable<Promotion> {
    return this.http.get<Promotion>(`${this.url}/${id}`);
  }

  update(id: number, dto: PromotionDto): Observable<Promotion> {
    return this.http.put<Promotion>(`${this.url}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}

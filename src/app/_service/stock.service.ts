import { Injectable } from '@angular/core';
import { ApiResponse, Envi } from '../_interface/envi';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MoveStockDto, Stock, StockDto, StockHistory } from '../_interface/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private readonly url = `${Envi.Url}/stocks`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.url);
  }

  create(dto: StockDto): Observable<Stock> {
    return this.http.post<Stock>(this.url, dto);
  }

  move(dto: MoveStockDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.url}/move`, dto);
  }

  getHistory(produitId: number): Observable<StockHistory[]> {
    return this.http.get<StockHistory[]>(`${this.url}/${produitId}/history`);
  }

  getById(id: number): Observable<Stock> {
    return this.http.get<Stock>(`${this.url}/${id}`);
  }

  update(id: number, dto: StockDto): Observable<Stock> {
    return this.http.put<Stock>(`${this.url}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}

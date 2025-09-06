import { Injectable } from '@angular/core';
import { ApiResponse, Envi, PaginatedResponse } from '../_interface/envi';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MoveStockDto, Stock, StockDto, StockHistory } from '../_interface/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private readonly url = `${Envi.Url}/stocks`;

  constructor(
    private http: HttpClient
  ) {}

  /** Liste paginée */
  getAll(page: number = 1): Observable<PaginatedResponse<Stock>> {
    return this.http.get<PaginatedResponse<Stock>>(this.url, {
      params: { page: page.toString() }
    });
  }

  /** Détails */
  getById(id: number): Observable<ApiResponse<Stock>> {
    return this.http.get<ApiResponse<Stock>>(`${this.url}/${id}`);
  }

  /** Création */
  create(dto: StockDto): Observable<Stock> {
    return this.http.post<Stock>(this.url, dto);
  }

  /** Mise à jour */
  update(id: number, dto: StockDto): Observable<Stock> {
    return this.http.put<Stock>(`${this.url}/${id}`, dto);
  }

  /** Suppression */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  /** Mouvement de stock */
  move(dto: MoveStockDto): Observable<Stock> {
    return this.http.post<Stock>(`${this.url}/move`, dto);
  }

  /** Historique */
  getHistory(produitId: number, page: number = 1): Observable<PaginatedResponse<StockHistory>> {
    return this.http.get<PaginatedResponse<StockHistory>>(`${this.url}/${produitId}/history`, {
      params: { page: page.toString() }
    });
  }

}

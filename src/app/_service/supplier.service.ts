import { Injectable } from '@angular/core';
import { ApiResponse, Envi, PaginatedResponse } from '../_interface/envi';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier, SupplierDto } from '../_interface/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private readonly url = `${Envi.Url}/suppliers`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<PaginatedResponse<Supplier>> {
    return this.http.get<PaginatedResponse<Supplier>>(this.url);
  }

  create(dto: SupplierDto): Observable<Supplier> {
    return this.http.post<Supplier>(this.url, dto);
  }

  pagination(page: number = 1): Observable<PaginatedResponse<Supplier>> {
    return this.http.get<PaginatedResponse<Supplier>>(`${this.url}/pagination`, {
      params: { page: page.toString() } 
    });
  }

  search(query: string): Observable<PaginatedResponse<Supplier>> {
    return this.http.get<PaginatedResponse<Supplier>>(`${this.url}/search?query=${query}`);
  }

  getById(id: number): Observable<ApiResponse<Supplier>> {
    return this.http.get<ApiResponse<Supplier>>(`${this.url}/${id}`);
  }

  update(id: number, dto: SupplierDto): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.url}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}

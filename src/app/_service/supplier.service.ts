import { Injectable } from '@angular/core';
import { ApiResponse, Envi } from '../_interface/envi';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier, SupplierDto } from '../_interface/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private readonly url = `${Envi.Url}/suppliers`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.url);
  }

  create(dto: SupplierDto): Observable<Supplier> {
    return this.http.post<Supplier>(this.url, dto);
  }

  pagination(params?: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.url}/pagination`, { params });
  }

  search(query: string): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.url}/search?query=${query}`);
  }

  getById(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.url}/${id}`);
  }

  update(id: number, dto: SupplierDto): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.url}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}

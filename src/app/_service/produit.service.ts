import { Injectable } from '@angular/core';
import { ApiResponse, Envi, PaginatedResponse } from '../_interface/envi';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit, ProduitDto } from '../_interface/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private readonly url = `${Envi.Url}/produits`;

  constructor(private http: HttpClient) {}

  getAll(page: number = 1): Observable<PaginatedResponse<Produit>> {
    return this.http.get<PaginatedResponse<Produit>>(this.url, {
      params: { page: page.toString() } 
    });
  }

  create(produit: ProduitDto | FormData): Observable<Produit> {
    return this.http.post<Produit>(this.url, produit);
  }

  filter(params: any): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.url}/filter`, { params });
  }

  search(query: string): Observable<PaginatedResponse<Produit>> {
    return this.http.get<PaginatedResponse<Produit>>(`${this.url}/search?query=${query}`);
  }

  getBySlug(slug: string): Observable<Produit> {
    return this.http.get<Produit>(`${this.url}/slug/${slug}`);
  }

  getById(id: number): Observable<ApiResponse<Produit>> {
    return this.http.get<ApiResponse<Produit>>(`${this.url}/${id}`);
  }

  update(id: number, formData: FormData ): Observable<Produit> {
    return this.http.put<Produit>(`${this.url}/${id}`, formData);
  }

  // update(id: number, formData: FormData): Observable<Produit> {
  //   return this.http.put<Produit>(`${this.url}/${id}`, formData);
  // }
  

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  toggleStatus(id: number): Observable<ApiResponse> {
    return this.http.patch<ApiResponse>(`${this.url}/${id}/toggle-status`, {});
  }

}

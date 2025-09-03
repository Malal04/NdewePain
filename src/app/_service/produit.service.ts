import { Injectable } from '@angular/core';
import { ApiResponse, Envi } from '../_interface/envi';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit, ProduitDto } from '../_interface/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private readonly url = `${Envi.Url}/produits`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.url);
  }

  create(produit: ProduitDto): Observable<Produit> {
    return this.http.post<Produit>(this.url, produit);
  }

  filter(params: any): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.url}/filter`, { params });
  }

  search(query: string): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.url}/search?query=${query}`);
  }

  getBySlug(slug: string): Observable<Produit> {
    return this.http.get<Produit>(`${this.url}/slug/${slug}`);
  }

  getById(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.url}/${id}`);
  }

  update(id: number, produit: ProduitDto): Observable<Produit> {
    return this.http.put<Produit>(`${this.url}/${id}`, produit);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  toggleStatus(id: number): Observable<ApiResponse> {
    return this.http.patch<ApiResponse>(`${this.url}/${id}/toggle-status`, {});
  }

}

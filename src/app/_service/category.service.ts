import { Injectable } from '@angular/core';
import { ApiResponse, Envi } from '../_interface/envi';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, CategoryDto } from '../_interface/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly url = `${Envi.Url}/categories`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }

  create(category: CategoryDto): Observable<Category> {
    return this.http.post<Category>(this.url, category);
  }

  search(query: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/search?query=${query}`);
  }

  getBySlug(slug: string): Observable<Category> {
    return this.http.get<Category>(`${this.url}/slug/${slug}`);
  }

  toggleStatus(id: number): Observable<ApiResponse> {
    return this.http.patch<ApiResponse>(`${this.url}/toggle-status/${id}`, {});
  }

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.url}/${id}`);
  }

  update(id: number, category: CategoryDto): Observable<Category> {
    return this.http.put<Category>(`${this.url}/${id}`, category);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}

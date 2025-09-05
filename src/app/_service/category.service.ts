import { Injectable } from '@angular/core';
import { ApiResponse, Envi, PaginatedResponse } from '../_interface/envi';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, CategoryDto } from '../_interface/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly url = `${Envi.Url}/categories`;

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<PaginatedResponse<Category>> {
    return this.http.get<PaginatedResponse<Category>>(`${this.url}/all`);
  }

  getAllPaginated( page: number = 1): Observable<PaginatedResponse<Category>> {
    return this.http.get<PaginatedResponse<Category>>(this.url, {
      params: { page: page.toString() } 
    });
  }

  create(category: CategoryDto): Observable<Category> {
    return this.http.post<Category>(this.url, category);
  }

  search(query: string): Observable<PaginatedResponse<Category>> {
    return this.http.get<PaginatedResponse<Category>>(`${this.url}/search?query=${query}`);
  }

  getBySlug(slug: string): Observable<Category> {
    return this.http.get<Category>(`${this.url}/slug/${slug}`);
  }

  toggleStatus(id: number): Observable<ApiResponse> {
    return this.http.patch<ApiResponse>(`${this.url}/toggle-status/${id}`, {});
  }

  getById(id: number): Observable<ApiResponse<Category>> {
    return this.http.get<ApiResponse<Category>>(`${this.url}/${id}`);
  }

  update(id: number, category: CategoryDto): Observable<Category> {
    return this.http.put<Category>(`${this.url}/${id}`, category);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}

import { Injectable } from '@angular/core';
import { ApiResponse, Envi } from '../_interface/envi';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adresse, AdresseDto } from '../_interface/adresse';

@Injectable({
  providedIn: 'root'
})
export class AdresseService {

  private readonly url = `${Envi.Url}/adresses`;

  constructor(private http: HttpClient) {}

  // GET api/v1/adresses
  getAll(): Observable<Adresse[]> {
    return this.http.get<Adresse[]>(`${this.url}`);
  }
  
  // POST api/v1/adresses
  create(adresse: AdresseDto): Observable<Adresse> {
    return this.http.post<Adresse>(`${this.url}`, adresse);
  }
  
  
  // POST api/v1/adresses/choisir/retrait
  choisirRetrait(): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.url}/choisir/retrait`, {});
  }
  
  
  // POST api/v1/adresses/choisir/{id}
  choisirAdresse(id: number | string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.url}/choisir/${id}`, {});
  }
  
  
  // GET api/v1/adresses/mode-livraison
  getModeLivraisonActuel(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.url}/mode-livraison`);
  }
  
  
  // GET api/v1/adresses/principale
  getAdressePrincipale(): Observable<Adresse> {
    return this.http.get<Adresse>(`${this.url}/principale`);
  }
  
  
  // GET api/v1/adresses/user/{id}
  listByUser(userId: number | string): Observable<Adresse[]> {
    return this.http.get<Adresse[]>(`${this.url}/user/${userId}`);
  }
  
  
  // GET api/v1/adresses/{id}
  getById(id: number | string): Observable<Adresse> {
    return this.http.get<Adresse>(`${this.url}/${id}`);
  }
  
  
  // PUT api/v1/adresses/{id}
  update(id: number | string, adresse: AdresseDto): Observable<Adresse> {
    return this.http.put<Adresse>(`${this.url}/${id}`, adresse);
  }
  
  
  // DELETE api/v1/adresses/{id}
  delete(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
  
  
  // POST api/v1/adresses/{id}/principale
  setAsPrincipale(id: number | string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.url}/${id}/principale`, {});
  }

}

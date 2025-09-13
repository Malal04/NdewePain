import { Injectable } from '@angular/core';
import { Envi } from '../_interface/envi';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RapportsService {
  private readonly apiUrl = `${Envi.Url}/rapports`;

  constructor(
    private http: HttpClient
  ) { }

  getStats(periode: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?periode=${periode}`);
  }

  getTendances(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tendances`);
  }

  getProduits(): Observable<any> {
    return this.http.get(`${this.apiUrl}/produits`);
  }

  exportRapport(): Observable<any> {
    return this.http.get(`${this.apiUrl}/export`);
  }

}

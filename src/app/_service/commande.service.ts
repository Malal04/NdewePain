import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Envi } from '../_interface/envi';
import { Observable } from 'rxjs';
import { Commande, CommandeResponse } from '../_interface/panier';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private readonly apiUrl = `${Envi.Url}/commandes`;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Confirmer une commande
  */
  confirmCommande(payload: any): Observable<CommandeResponse<Commande>> {
    return this.http.post<CommandeResponse<Commande>>(`${this.apiUrl}/confirm`, payload);
  }
  
  /**
    * Liste des commandes utilisateur
  */
  getCommandes(): Observable<CommandeResponse<Commande[]>> {
    return this.http.get<CommandeResponse<Commande[]>>(this.apiUrl);
  }
  
  /**
   * Détail d’une commande
  */
  getCommande(id: number): Observable<CommandeResponse<Commande>> {
    return this.http.get<CommandeResponse<Commande>>(`${this.apiUrl}/${id}`);
  }

}

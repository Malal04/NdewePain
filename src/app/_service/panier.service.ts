import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Envi } from '../_interface/envi';
import { Observable } from 'rxjs';
import { CartResponse, CheckoutData, Commande, PromoResponse } from '../_interface/panier';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  private readonly baseUrl = `${Envi.Url}/carts`;

  constructor(
    private http: HttpClient
  ) { }


  /** Voir panier */
  getCart(): Observable<CartResponse> {
    return this.http.get<CartResponse>(`${this.baseUrl}`);
  }

  /** Ajouter un produit */
  addItem(produitId: number, quantite: number): Observable<CartResponse> {
    return this.http.post<CartResponse>(`${this.baseUrl}/items`, {
      produit_id: produitId,
      quantite: quantite
    });
  }

  promo(promo_code: string): Observable<PromoResponse> {
    return this.http.post<PromoResponse>(`${this.baseUrl}/promo`, {
      promo_code
    });
  }

  /** Mettre à jour quantité */
  updateItem(itemId: number, quantite: number): Observable<CartResponse> {
    return this.http.put<CartResponse>(`${this.baseUrl}/items/${itemId}`, {
      quantite: quantite
    });
  }

  /** Supprimer un article */
  removeItem(itemId: number): Observable<CartResponse> {
    return this.http.delete<CartResponse>(`${this.baseUrl}/items/${itemId}`);
  }

  /** Vider le panier */
  clearCart(): Observable<CartResponse> {
    return this.http.delete<CartResponse>(`${this.baseUrl}`);
  }

  setDeliveryMode(mode: string, frais: number = 0) {
    return this.http.post<any>(`${this.baseUrl}/set-delivery`, {
      mode_livraison: mode,
      frais_livraison: frais
    });
  }

  confirmOrder(methode_paiement: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/confirm`, { methode_paiement });
  }

  getCommandes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/commandes`);
  }

  getMesCommandes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/mes-commandes`);
  }
  
  getDetailCommande(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/mes-commandes/${id}`);
  }

  updateStatutCommande(id: number, statut_commande: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/commandes/${id}/statut`, { statut_commande });
  }
  
  
}

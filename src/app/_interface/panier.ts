import { Produit } from "./produit";
import { User } from "./user";

export interface CartItem {
  id: number;
  produit_id: number;
  produit: Produit;
  quantite: number;
  prix_unitaire: number;
  total: number;
  personnalisation?: string | null;
}

export interface Cart {
  id: number;
  user_id: number;
  items: CartItem[];
}

export interface CheckoutData {
  cart: CartItem[];
  subtotal: number;
  discount: number;
  delivery_fee: number;
  total: number;
}

export interface ArticleCommande {
  id: number;
  commande_id: number;
  produit_id: number;
  produit: Produit;
  quantite: number;
  prix_unitaire: number;
  total: number;
  personnalisation?: string | null;
}

export interface Commande {
  id: number;
  user_id: number;
  user: User;
  code_commande: string;
  mode_livraison: string;
  sous_total: number;
  frais_livraison: number;
  remise: number;
  total: number;
  plage_horaire?: string | null;
  statut_commande: string;
  adresse_id?: number | null;
  articlesCommande: ArticleCommande[];
  paiement: Paiement;
  created_at: string;
  updated_at: string;
}

export interface Paiement {
  id: number;
  commande_id: number;
  methode: string;
  statut: string;
  montant: number;
  transaction_id?: string;
}

export interface PromoResponse {
  success: boolean;
  message: string;
}

export interface CartItem {
  id: number;
  produit_id: number;
  nom_produit: string;
  photo_url?: string | null;
  quantite: number;
  prix_unitaire: number;
  total: number;
  slug?: string;
  personnalisation?: string | null;
}

export interface Cart {
  id: number;
  user_id: number ;
  promo_code: string | null;
  remise_appliquee: number;
  mode_livraison: string;
  items: CartItem[];
}

export interface CartResponse {
  data: Cart;
  meta: {
    message?: string;
    totals: {
      sous_total: number;
      frais_livraison: number;
      remise: number;
      total: number;
    };
  };
}

export interface CommandeResponse<T> {
  data: T;
  meta?: any;
}

export interface Tache {
  titre: string;
  produit: string;
  quantite: string;
  deadline: Date;
  responsable: string;
  statut: 'programmé' | 'en cours' | 'terminé';
}

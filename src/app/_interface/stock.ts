import { Produit } from "./produit";

export interface Stock {
    id: number,
    produit: Produit,
    quantite_actuelle: number,
    seuil_minimum: number,
    statut: string,
    historique: StockHistory,
    created_at: Date,
    updated_at: Date,
}

export interface StockDto {
    produit_id: number,
    type_mouvement: string,
    quantite: number,
    commentaire: string,
    seuil_minimum: number,
}

export interface MoveStockDto {
    user_id: number,
    produit_id: number,
    quantite: number,
    type_mouvement: string,
    commentaire: string,
}

export interface StockHistory {
    id: number,
    produit_id: number,
    type_mouvement: string,
    quantite: number,
    user_id: number,
    commentaire: string,
    created_at: Date,
}
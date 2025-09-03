import { Supplier } from "./supplier";

export interface Ingredient {
    id: number;
    nom: string;
    quantite: string;
    seuil_reappro: number;
    supplier: Supplier;
    statut: string;
    created_at: Date;
}

export interface IngredientDto {
    supplier_id: number;
    nom: string;
    quantite: string;
    seuil_reappro: number;
    statut: string;
}

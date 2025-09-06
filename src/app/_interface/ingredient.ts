import { StatutIngredient } from "../_enum/inventory";
import { Supplier } from "./supplier";

export interface Ingredient {
    id: number;
    nom: string;
    quantite: string;
    seuil_reappro: number;
    supplier: Supplier;
    unite: string;
    statut: StatutIngredient;
    created_at: Date;
}

export interface IngredientDto {
    supplier_id: number;
    nom: string;
    quantite: string;
    seuil_reappro: number;
    unite: string;
    statut: StatutIngredient;
}

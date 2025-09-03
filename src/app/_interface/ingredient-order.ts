import { Ingredient } from "./ingredient";
import { Supplier } from "./supplier";

export interface IngredientOrder {
    id: number;
    ingredient: Ingredient;
    supplier: Supplier;
    quantite: number;
    statut: string;
    created_at: Date;
}

export interface IngredientOrderDto {
    ingredient_id: number;
    supplier_id: number;
    quantite: number;
    statut: string;
}

import { Ingredient } from "./ingredient";
import { Supplier } from "./supplier";
import { StatutIngredientOrder } from "../_enum/inventory";

export interface IngredientOrder {
    id: number;
    ingredient: Ingredient;
    supplier: Supplier;
    quantite: number;
    statut: StatutIngredientOrder;
    created_at: Date;
}

export interface IngredientOrderDto {
    ingredient_id: number;
    supplier_id: number;
    quantite: number;
    statut: StatutIngredientOrder;
}

import { StatutPromotion, TypeRemise } from "../_enum/inventory";
import { Produit } from "./produit";

export interface Promotion {
    id: number;
    nom: string;
    description: string;
    type_remise: TypeRemise;
    valeur_remise: number;
    code_promo: string;
    conditions: string;
    date_debut: Date;
    date_fin: Date;
    recurrence: string;
    status: StatutPromotion;
    is_currently_valid: boolean;
    produits: Produit[];
    created_at: Date;
}

export interface PromotionDto {
    nom: string;
    description: string;
    type_remise: TypeRemise;
    valeur_remise: number;
    code_promo: string;
    conditions: string;
    date_debut: Date;
    date_fin: Date;
    recurrence: string;
    status: StatutPromotion;
    produit_ids: number[];
}

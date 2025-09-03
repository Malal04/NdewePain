export interface Promotion {
    id: number;
    nom: string;
    description: string;
    type_remise: string;
    valeur_remise: number;
    code_promo: string;
    conditions: string;
    date_debut: Date;
    date_fin: Date;
    recurrence: string;
    status: string;
    is_currently_valid: boolean;
    produits: number[];
    created_at: Date;
}

export interface PromotionDto {
    nom: string;
    description: string;
    type_remise: string;
    valeur_remise: number;
    code_promo: string;
    conditions: string;
    date_debut: Date;
    date_fin: Date;
    recurrence: string;
    status: string;
    produit_ids: number[];
}

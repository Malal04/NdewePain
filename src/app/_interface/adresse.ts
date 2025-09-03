import { AdresseModeLivraison, AdresseType } from "../_enum/adresse";

export interface Adresse {
    id: number;
    user_id: number,
    ligne_adresse: string,
    ville: string;
    code_postal: string;
    pays: string;
    est_principale: boolean;
    type: AdresseType;
    mode_livraison: AdresseModeLivraison;
    created_at: Date;
}


export interface AdresseDto {
    ligne_adresse: string,
    ville: string,
    code_postal: string,
    pays: string,
    est_principale: boolean,
    type: AdresseType,
    mode_livraison: AdresseModeLivraison,
}
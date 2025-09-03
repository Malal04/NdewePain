import { Produit } from "./produit";

export interface Category {
    id: number;
    nom: string;
    slug: string;
    description: string;
    status: string;
    produits: Produit[];
    created_at: Date;
}

export interface CategoryDto {
    nom: string;
    slug: string;
    status: string;
    description: string;
}
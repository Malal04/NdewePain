import { Category } from "./category";

export interface Produit {
    id: number;
    nom: string;
    slug: string;
    description: string;
    prix_unitaire: number;
    photo_url: string;
    stock: number;
    allergenes: string[];
    status: string;
    categorie: Category;
    created_at: Date;
}

export interface ProduitDto {
    categorie_id: number;
    nom: string;
    slug: string;
    description: string;
    prix_unitaire: number;
    photo_url: string;
    stock: number;
    allergenes: string[];
    status: string; 
}

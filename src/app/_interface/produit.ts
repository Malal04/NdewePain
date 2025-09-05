import { Status } from "../_enum/dtos";
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
    status: Status;
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
    status: Status; 
}

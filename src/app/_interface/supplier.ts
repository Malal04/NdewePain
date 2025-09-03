export interface Supplier {
    id: number;
    nom: string;
    contact_person: string;
    email: string;
    telephone: string;
    adresse: string;
    created_at: Date;
}

export interface SupplierDto {
    nom: string;
    contact_person: string;
    email: string;
    telephone: string;
    adresse: string;
}

import { Role } from "../_enum/dtos";

export interface User {
    id: number;
    nom: string;
    email: string;
    password: string;
    role: Role;
    telephone: string;
    adresse: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserRegister {
    nom: string;
    email: string;
    password: string;
    role: Role;
    telephone: string;
    adresse: string;
}

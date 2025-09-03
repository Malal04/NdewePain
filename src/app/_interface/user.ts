import { AccountState, Role } from "../_enum/dtos";

export interface User {
    id: number;
    nom: string;
    email: string;
    phone: string;
    profile?: string;
    accountState: AccountState;
    role: Role;
    password: string;
    created_at: Date;
    updated_at: Date;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserRegister {
    nom: string;
    email: string;
    phone: string;
    profile?: string;
    accountState: AccountState;
    role: Role;
    password: string;
}

export interface ChangePasswordDto {
    current_password: string;
    new_password: string;
}

export interface ForgotPasswordDto {
    email: string;
}

export interface ResetPasswordDto {
    password: string;
    email: string;
    token: string;
}

export interface UpdateProfileDto {
    nom: string;
    email: string;
    phone: string;
    profile?: string;
    accountState: AccountState;
    role: Role;
    password: string;
}

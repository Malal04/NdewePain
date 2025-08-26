import { User } from "./user";
import { Role } from "../_enum/dtos";

export interface Token {
    user: User;
    message: string;
    token: string;
    role: Role;
    refreshToken: string;
}
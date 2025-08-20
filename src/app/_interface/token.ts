import { Role } from "../_enum/dtos";
import { User } from "./user";

export interface Token {
    accessToken: string;
    refreshToken: string;
    message: string;
    user: User;
    id : number;
    role: Role;
}
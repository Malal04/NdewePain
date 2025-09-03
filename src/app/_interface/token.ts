import { User } from "./user";
import { Role, AccountState } from "../_enum/dtos";

export interface Token {
    status: boolean;
    token: string;
    user: User;
    role: Role;
    accountState: AccountState;
    message: string;
    refreshToken: string;
}